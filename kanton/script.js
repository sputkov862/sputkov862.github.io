// ============================================================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ============================================================================

let config = null;
let currentPhase = '1';
let map = null;
let markers = [];
let selectedBuilding = null;
let highlightedCategory = null;
let isCategoryLocked = false; // Флаг для отслеживания фиксации категории кликом
let clickedRectangle = null; // Ссылка на конкретный кликнутый прямоугольник

// ============================================================================
// ЗАГРУЗКА КОНФИГУРАЦИИ
// ============================================================================

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        config = await response.json();
        console.log('Конфигурация загружена:', config);
        return config;
    } catch (error) {
        console.error('Ошибка загрузки конфигурации:', error);
        return null;
    }
}

// ============================================================================
// ИНИЦИАЛИЗАЦИЯ КАРТЫ
// ============================================================================

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 700;

function initMap() {
    // Определяем, мобильное ли устройство
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: isMobile ? -2 : -1,
        maxZoom: isSmallMobile ? 1.5 : 2,
        zoomControl: false,
        attributionControl: false,
        zoomSnap: 0.25,
        zoomDelta: isMobile ? 0.25 : 0.5,
        tap: true, // Включаем поддержку тач-событий
        touchZoom: true,
        dragging: true,
        doubleClickZoom: true,
        boxZoom: false
    });

    const bounds = [[0, 0], [MAP_HEIGHT, MAP_WIDTH]];

    // Добавление фонового изображения
    const imageUrl = 'map-background.png';
    const imageOverlay = L.imageOverlay(imageUrl, bounds, {
        opacity: 0.8,
        interactive: false
    }).addTo(map);

    // Обработка загрузки изображения
    imageOverlay.on('load', function() {
        console.log('Фоновое изображение загружено успешно');
    });

    imageOverlay.on('error', function() {
        console.warn('Фоновое изображение не найдено. Добавьте файл map-background.png в папку проекта');
    });

    // Установка начального вида
    map.fitBounds(bounds);
    map.setMaxBounds([
        [-50, -50],
        [MAP_HEIGHT + 50, MAP_WIDTH + 50]
    ]);
    
    // Обработчик клика на пустое место карты для снятия выделения
    map.on('click', function(e) {
        // Проверяем, был ли клик на объекте или на пустом месте
        // Если на пустом месте - снимаем выделение
        if (isCategoryLocked) {
            clearSelection();
        }
    });
}

// ============================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================================

function adjustBrightness(color, factor) {
    // Конвертируем hex в RGB
    const hex = color.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Увеличиваем яркость
    r = Math.min(255, Math.floor(r * factor));
    g = Math.min(255, Math.floor(g * factor));
    b = Math.min(255, Math.floor(b * factor));
    
    // Конвертируем обратно в hex
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// ============================================================================
// СОЗДАНИЕ МАРКЕРОВ ЗДАНИЙ
// ============================================================================

function createBuildingMarker(building) {
    const parts = building.parts || [];
    if (parts.length === 0) return null;
    
    // Создаём LayerGroup для здания
    const buildingGroup = L.layerGroup();
    buildingGroup.building = building;
    buildingGroup.rectangles = [];
    
    // Создаём прямоугольники для каждой части
    parts.forEach((part, partIndex) => {
        const categoryData = config.phases[currentPhase].categories[part.category];
        if (!categoryData) {
            console.warn(`Категория ${part.category} не найдена в фазе ${currentPhase}`);
            return;
        }
        
        const color = categoryData.color;
        const lighterBorder = adjustBrightness(color, 1.3);
        
        // Создаём прямоугольник (bounds в формате [[lat, lng], [lat, lng]])
        const bounds = [
            [part.y, part.x],
            [part.y + part.height, part.x + part.width]
        ];
        
        const rectangle = L.rectangle(bounds, {
            color: lighterBorder,
            weight: 1,
            fillColor: color,
            fillOpacity: 1,
            interactive: true
        });
        
        // Сохраняем данные части
        rectangle.partData = {
            building: building,
            partIndex: partIndex,
            part: part,
            category: part.category
        };
        
        // Обработчики событий
        rectangle.on('click', (e) => {
            L.DomEvent.stopPropagation(e); // Останавливаем всплытие события к карте
            handlePartClick(building, partIndex, part, rectangle);
        });
        
        rectangle.on('mouseover', function(e) {
            highlightedCategory = part.category;
            updateMarkers();
            
            const buildingName = `Павильон ${building.number}`;
            const zone = categoryData.zone || '';
            const tooltip = `<div class="tooltip-content">
                <div class="tooltip-header">${buildingName}</div>
                ${zone ? `<div class="tooltip-zone">${zone}</div>` : ''}
                <div class="tooltip-category">${categoryData.name}</div>
            </div>`;
            
            // Вычисляем динамический offset на основе текущего зума
            const currentZoom = map.getZoom();
            const zoomFactor = Math.pow(2, currentZoom);
            const baseOffset = 20; // Базовый отступ в единицах карты
            const pixelOffset = baseOffset * zoomFactor;
            
            this.bindTooltip(tooltip, {
                direction: 'top',
                className: 'custom-tooltip',
                offset: [0, -pixelOffset],
                opacity: 1,
                permanent: false,
                sticky: false
            }).openTooltip();
        });
        
        rectangle.on('mouseout', function() {
            // Не снимаем выделение, если категория зафиксирована кликом
            if (!isCategoryLocked) {
                highlightedCategory = null;
                updateMarkers();
            }
            this.unbindTooltip();
        });
        
        buildingGroup.addLayer(rectangle);
        buildingGroup.rectangles.push(rectangle);
    });
    
    // Вычисляем общие границы всего здания
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    parts.forEach(part => {
        minX = Math.min(minX, part.x);
        minY = Math.min(minY, part.y);
        maxX = Math.max(maxX, part.x + part.width);
        maxY = Math.max(maxY, part.y + part.height);
    });
    
    // Центр - это середина общего прямоугольника
    const centerX = minX + (maxX - minX) / 2;
    const centerY = minY + (maxY - minY) / 2;
    
    // Создаём SVG с текстом
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('viewBox', '-50 -50 100 100');
    svgElement.style.overflow = 'visible';
    
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', '0');
    textElement.setAttribute('y', '0');
    textElement.setAttribute('text-anchor', 'middle');
    textElement.setAttribute('dominant-baseline', 'middle');
    textElement.setAttribute('font-size', '100');
    textElement.setAttribute('font-weight', 'bold');
    textElement.setAttribute('fill', '#fff');
    textElement.textContent = building.number;
    
    svgElement.appendChild(textElement);
    
    // Создаём bounds для SVG (побольше квадрат в центре)
    const size = 10;
    const svgBounds = [
        [centerY - size, centerX - size],
        [centerY + size, centerX + size]
    ];
    
    const svgOverlay = L.svgOverlay(svgElement, svgBounds, {
        interactive: false,
        className: 'building-number-svg'
    });
    
    buildingGroup.addLayer(svgOverlay);
    
    return buildingGroup;
}

// ============================================================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// ============================================================================

function handlePartClick(building, partIndex, part, rectangle) {
    // Если кликнули на тот же объект, снимаем выделение
    if (clickedRectangle === rectangle && isCategoryLocked) {
        clearSelection();
        return;
    }
    
    // Выделяем новую категорию или фиксируем текущую
    selectedBuilding = null;
    highlightedCategory = part.category;
    isCategoryLocked = true; // Фиксируем выделение
    clickedRectangle = rectangle; // Запоминаем кликнутый прямоугольник
    
    updateMarkers();
    updateSidebarSelection(part.category);
    
    // Центрируем карту на части
    map.setView([part.y + part.height / 2, part.x + part.width / 2], map.getZoom(), { animate: true });
}

function clearSelection() {
    selectedBuilding = null;
    highlightedCategory = null;
    isCategoryLocked = false; // Снимаем фиксацию
    updateMarkers();
    updateSidebarSelection(null);
}

function updateMarkers() {
    // Обновляем стили прямоугольников
    markers.forEach(buildingGroup => {
        if (!buildingGroup.rectangles) return;
        
        buildingGroup.rectangles.forEach(rectangle => {
            const partData = rectangle.partData;
            if (!partData) return;
            
            const categoryData = config.phases[currentPhase].categories[partData.category];
            if (!categoryData) return;
            
            const color = categoryData.color;
            const lighterBorder = adjustBrightness(color, 1.3);
            
            if (highlightedCategory && partData.category === highlightedCategory) {
                // При выделении: толще граница и ярче цвет
                rectangle.setStyle({
                    color: lighterBorder,
                    weight: 5,
                    fillColor: color,
                    fillOpacity: 1
                });
            } else if (highlightedCategory && partData.category !== highlightedCategory) {
                // Невыделенные категории - полупрозрачные (когда есть выделение)
                rectangle.setStyle({
                    color: lighterBorder,
                    weight: 1,
                    fillColor: color,
                    fillOpacity: 0.3
                });
            } else {
                // Обычное состояние (нет выделения)
                rectangle.setStyle({
                    color: lighterBorder,
                    weight: 1,
                    fillColor: color,
                    fillOpacity: 1
                });
            }
        });
    });
}

function updateSidebarSelection(category) {
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
        if (category && item.dataset.category === category) {
            item.classList.add('active');
        }
    });
}

// ============================================================================
// ОТРИСОВКА ЗДАНИЙ ДЛЯ ТЕКУЩЕЙ ФАЗЫ
// ============================================================================

function renderBuildings() {
    // Удаляем все существующие маркеры
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    const phaseData = config.phases[currentPhase];
    const buildings = phaseData.buildings;
    
    // Создаем по одному маркеру на здание
    buildings.forEach(building => {
        const buildingGroup = createBuildingMarker(building);
        if (buildingGroup) {
            buildingGroup.addTo(map);
            markers.push(buildingGroup);
        }
    });
    
    console.log(`Отрисовано ${markers.length} зданий для фазы ${currentPhase}`);
}

// ============================================================================
// ОБНОВЛЕНИЕ БОКОВОГО МЕНЮ
// ============================================================================

function updateSidebar() {
    const phaseData = config.phases[currentPhase];
    const categories = phaseData.categories;
    
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = '';
    
    Object.keys(categories).forEach(categoryKey => {
        const categoryData = categories[categoryKey];
        const li = document.createElement('li');
        li.className = 'category-item';
        li.dataset.category = categoryKey;
        li.textContent = categoryData.name;
        li.style.borderLeft = `12px solid ${categoryData.color}`;
        li.style.paddingLeft = '12px';
        
        li.addEventListener('click', () => {
            const category = li.dataset.category;
            
            if (highlightedCategory === category && isCategoryLocked) {
                clearSelection();
            } else {
                selectedBuilding = null;
                highlightedCategory = category;
                isCategoryLocked = true; // Фиксируем выделение при клике на категорию
                updateMarkers();
                updateSidebarSelection(category);
            }
        });
        
        categoryList.appendChild(li);
    });
}

// ============================================================================
// ПЕРЕКЛЮЧЕНИЕ ФАЗ
// ============================================================================

function switchPhase(phase) {
    currentPhase = phase;
    
    // Сохраняем выбранную фазу в localStorage
    localStorage.setItem('selectedPhase', phase);
    
    clearSelection();
    updateSidebar();
    renderBuildings();
    
    // Обновляем активную кнопку
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.phase === phase) {
            btn.classList.add('active');
        }
    });
}

// ============================================================================
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// ============================================================================

async function init() {
    console.log('Инициализация приложения...');
    
    // Загружаем конфигурацию
    await loadConfig();
    
    if (!config) {
        console.error('Не удалось загрузить конфигурацию');
        return;
    }
    
    // Загружаем сохраненную фазу из localStorage, если она есть
    // Если нет - используем фазу 1 по умолчанию
    const savedPhase = localStorage.getItem('selectedPhase');
    if (savedPhase && config.phases[savedPhase]) {
        currentPhase = savedPhase;
    } else {
        // При первом посещении устанавливаем фазу 1
        currentPhase = '1';
    }
    
    // Инициализируем карту
    initMap();
    
    // Обновляем интерфейс
    updateSidebar();
    renderBuildings();
    
    // Устанавливаем активную кнопку фазы (убираем все active и добавляем нужной)
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.phase === currentPhase) {
            btn.classList.add('active');
        }
    });
    
    // Обработчики переключения фаз
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const phase = btn.dataset.phase;
            switchPhase(phase);
        });
    });
    
    console.log('Приложение инициализировано');
}

// ============================================================================
// АДАПТИВНОСТЬ И ОБРАБОТКА ИЗМЕНЕНИЙ ЭКРАНА
// ============================================================================

// Обработка изменения размера окна и ориентации
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (map) {
            map.invalidateSize();
            console.log('Размер карты обновлен');
        }
    }, 250);
});

// Обработка изменения ориентации на мобильных
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (map) {
            map.invalidateSize();
            console.log('Ориентация изменена, карта обновлена');
        }
    }, 300);
});

// Предотвращение случайного зума при двойном тапе на iOS
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Запускаем приложение после загрузки DOM
document.addEventListener('DOMContentLoaded', init);
