import { CanvasService } from './src/CanvasService.js';
import { crateConfig, platformConfig, truckConfig } from './config.js';

const mapWidth = 1000;
const mapHeight = 1000;
const speed = 5;
const canvas = new CanvasService(mapWidth, mapHeight);

canvas.attach(document.body);