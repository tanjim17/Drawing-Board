import React from "react";
import './Canvas.css';
import pencil from "./assets/pencil1.png";
import pencilSelected from "./assets/pencil1Selected.png";
import eraser from "./assets/eraser.png";
import eraserSelected from "./assets/eraserSelected.png";
import drawPointer from "./assets/draw-pointer.png";
import erasePointer from "./assets/erase-pointer.png";
import bin from "./assets/bin.png";
import download from "./assets/download.png";
import tick from "./assets/tick.png";

const COLORS = ['#000000', '#ffffff', '#808080', '#ff0000', '#800080', '#ff69b4', '#008000', '#7cfc00', '#0000ff',
    '#00bfff', '#ffff00', '#ff8c00', '#8b4513'];
const ERASER = '#faebd7';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.contextRef = React.createRef();
        this.state = {
            isDrawing: false,
            myColor: '#000000',
        };
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = window.innerHeight * 0.87;
        const context = canvas.getContext('2d');
        context.fillStyle = ERASER;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.lineCap = 'round';
        context.strokeStyle = this.state.myColor;
        context.lineWidth = 3;
        this.contextRef.current = context;
        this.setImage(this.state.myColor, tick);
        this.setImage('pencil', pencilSelected);
        this.setImage(ERASER, eraser);
    }

    startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        this.contextRef.current.beginPath();
        this.contextRef.current.moveTo(offsetX, offsetY);
        this.setState({ isDrawing: true });
    };

    draw = ({ nativeEvent }) => {
        if (!this.state.isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        this.contextRef.current.lineTo(offsetX, offsetY);
        this.contextRef.current.stroke();
    };

    finishDrawing = () => {
        this.contextRef.current.closePath();
        this.setState({ isDrawing: false });
    };

    changeColor = (new_color) => {
        const prev_color = this.state.myColor;
        if (prev_color === ERASER) {
            this.setImage(prev_color, eraser);
            this.setImage('pencil', pencilSelected);
        } else {
            document.getElementById(prev_color).style.backgroundImage = '';
        }
        this.setState({ myColor: new_color });
        if (new_color === ERASER) {
            this.setImage(new_color, eraserSelected);
            this.setImage('pencil', pencil);
            this.contextRef.current.lineWidth = 18;
            this.canvasRef.current.style.cursor = `url(${erasePointer}) 6 6, auto`;
        } else {
            this.setImage(new_color, tick);
            this.contextRef.current.lineWidth = 3;
            this.canvasRef.current.style.cursor = `url(${drawPointer}) 6 6, auto`;
        }
        this.contextRef.current.strokeStyle = new_color;
    };

    clearCanvas = () => {
        this.contextRef.current.fillStyle = ERASER;
        this.contextRef.current.fillRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    };

    setImage = (id, image) => {
        document.getElementById(id).style.backgroundImage = `url(${image})`;
        document.getElementById(id).style.backgroundSize = '50px';
        document.getElementById(id).style.backgroundRepeat = 'no-repeat';
    };

    downloadImage = () => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = this.canvasRef.current.toDataURL();
        a.download = "my-drawing.png";
        a.click();
        document.body.removeChild(a);
    }

    render() {
        return (
            <div>
                <canvas className="canvas"
                    onMouseDown={this.startDrawing}
                    onMouseMove={this.draw}
                    onMouseUp={this.finishDrawing}
                    ref={this.canvasRef} />
                <table style={{ margin: 'auto', width: '50%', cursor: 'pointer' }}>
                    <tbody>
                        <tr style={{ height: 50 }}>
                            {COLORS.map(color => {
                                return <td key={color} id={color} style={{ backgroundColor: color }}
                                    onClick={() => this.changeColor(color)} />
                            })}
                            <td id='pencil' onClick={() => this.changeColor('#000000')} />
                            <td id={ERASER} onClick={() => this.changeColor(ERASER)} />
                            <td style={{
                                backgroundImage: `url(${bin})`, backgroundSize: 50,
                                backgroundRepeat: 'no-repeat'
                            }} onClick={this.clearCanvas} />
                            <td style={{
                                backgroundImage: `url(${download})`, backgroundSize: 50,
                                backgroundRepeat: 'no-repeat'
                            }} onClick={this.downloadImage} />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Canvas;