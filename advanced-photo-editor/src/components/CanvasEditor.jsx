
import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [tool, setTool] = useState('select');

  useEffect(() => {
    const c = new fabric.Canvas('editor-canvas', {
      height: 600,
      width: 800,
      backgroundColor: '#fff'
    });
    setCanvas(c);

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 200,
      height: 100
    });
    c.add(rect);
  }, []);

  const handleToolChange = (selectedTool) => {
    setTool(selectedTool);
    if (!canvas) return;

    if (selectedTool === 'brush') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = 10;
      canvas.freeDrawingBrush.color = 'black';
    } else if (selectedTool === 'wetBrush') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = 20;
      canvas.freeDrawingBrush.color = 'blue';
      canvas.freeDrawingBrush.opacity = 0.2;
    } else if (selectedTool === 'eraser') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = 30;
      canvas.freeDrawingBrush.color = canvas.backgroundColor;
    } else {
      canvas.isDrawingMode = false;
    }
  };

  const handleBrightness = (e) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.filters = [new fabric.Image.filters.Brightness({ brightness: parseFloat(e.target.value) })];
      activeObject.applyFilters();
      canvas.renderAll();
    }
  };

  const handleBlur = (e) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.filters = [new fabric.Image.filters.Blur({ blur: parseFloat(e.target.value) })];
      activeObject.applyFilters();
      canvas.renderAll();
    }
  };

  const handleExport = () => {
    const dataURL = canvas.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'design.png';
    link.click();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Advanced Photo Editor</h1>
      <canvas id="editor-canvas" ref={canvasRef}></canvas>

      <div className="flex gap-4 mt-4 flex-wrap">
        <button onClick={() => handleToolChange('select')} className="bg-blue-500 text-white px-4 py-2 rounded">Select</button>
        <button onClick={() => handleToolChange('brush')} className="bg-purple-500 text-white px-4 py-2 rounded">Smooth Brush</button>
        <button onClick={() => handleToolChange('wetBrush')} className="bg-teal-500 text-white px-4 py-2 rounded">Wetness Brush</button>
        <button onClick={() => handleToolChange('eraser')} className="bg-red-500 text-white px-4 py-2 rounded">Eraser Tool</button>
      </div>

      <div className="flex gap-4 mt-4 flex-wrap">
        <div>
          <label>Brightness</label>
          <input type="range" min="-1" max="1" step="0.1" onChange={handleBrightness} />
        </div>

        <div>
          <label>Blur</label>
          <input type="range" min="0" max="1" step="0.01" onChange={handleBlur} />
        </div>
      </div>

      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded" onClick={handleExport}>Export Image</button>
    </div>
  );
};

export default CanvasEditor;
