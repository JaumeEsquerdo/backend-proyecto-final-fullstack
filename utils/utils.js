
export const obtenerIconoPorTipo = (tipo) => {
    const iconos = {
        cultural: 'cultural.svg',
        playa: 'playa.svg',
        gastronomia: 'gastronomia.svg',
        naturaleza: 'naturaleza.svg',
        deporte: 'deporte.svg',
        ocio: 'ocio.svg'
    }

    return iconos[tipo] || 'default.svg'
}

export const obtenerIconoPackPorTipo = (tipo) => {
    const iconos = {
        cultural: '/img/packs/pack-cultural.svg',
        playa: '/img/packs/pack-playa.svg',
        gastronomia: '/img/packs/pack-gastronomia.svg',
        naturaleza: '/img/packs/pack-naturaleza.svg',
        deporte: '/img/packs/pack-deporte.svg',
        ocio: '/img/packs/pack-ocio.svg',
    };

    return iconos[tipo] || '/img/packs/pack-default.svg';
};

