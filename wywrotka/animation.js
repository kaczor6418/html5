import { crateConfig, platformConfig, truckConfig } from './config.js';

const baseXPosition = 100;
const baseYPosition = 100;
const mapWidth = 1000;
const mapHeight = 1000;
const speed = 5;

const canvas = document.createElement('canvas');;
const context = canvas.getContext('2d');