import css_sprites from '../assets/icons/css_sprites.png';

export const spriteSheet = css_sprites;

export interface Sponsor {
  alt: string;
  x: number;
  y: number;
}

const sponsorCoordinates: { [key:string]: {x: number, y: number} } = {
    'alibaba': { x: -10, y: -10 },
    'alo': { x: -272, y: -10 },
    'boya': { x: -10, y: -228 },
    'cisco': { x: -272, y: -228 },
    'colt': { x: -796, y: -664 },
    'css': { x: -534, y: -10 },
    'ds': { x: -534, y: -228 },
    'fcn': { x: -534, y: -446 },
    'fend': { x: -10, y: -446 },
    'fil': { x: -272, y: -446 },
    'gen': { x: -1058, y: -10 },
    'hitachi': { x: -272, y: -664 },
    'infosys': { x: -796, y: -446 },
    'lenovo': { x: -10, y: -664 },
    'nissan': { x: -796, y: -10 },
    'ns': { x: -796, y: -228 },
    'ntt': { x: -534, y: -664 },
    'qs': { x: -1058, y: -228 },
    'redbook': { x: -1058, y: -446 },
    'tcl': { x: -10, y: -882 },
    'trsassion': { x: -1058, y: -664 },
    'www': { x: -272, y: -882 },
    'yd': { x: -534, y: -882 },
    'zj': { x: -796, y: -882 },
};

// This is the original order from the old images.ts
const sponsorNames = [
  "Alibaba", "Alo", "Boya", "Cisco", "Colt", "Css", "Ds", "Fcn", "Fend", "Fil", "Gen", "Hitachi", "Infosys", "Lenovo", "Nissan", "Ns", "Ntt", "Qs", "Redbook", "Tcl", "Trsassion", "Www", "YD", "ZJ"
];

export const sponsors: Sponsor[] = sponsorNames.map(name => {
    const coords = sponsorCoordinates[name.toLowerCase()];
    return {
        alt: name,
        x: coords.x,
        y: coords.y,
    };
});
