class Figura {
    //inicializar de una vez las variables, por si acaso que el usuario no hace nada o asi 
    constructor(posicionesCursor = {}, color_linea = "black", color_relleno = "black", grosor_linea = 5) {
        //variables propias de la clase
        this.posicion_X = Math.min(posicionesCursor.iniciales.x, posicionesCursor.finales.x);
        this.posicion_Y = Math.min(posicionesCursor.iniciales.y, posicionesCursor.finales.y);

        this.color_linea = color_linea;
        this.color_relleno = color_relleno;
        this.grosor_linea = grosor_linea;
    }
}


//modulos, fracciones de archivos para que se comuniquen entre ellos, esto se hace con export 
//la clase cuadrado hereda de la figura como en c#
export class Cuadrado extends Figura {

    constructor(posicionesCursor, color_linea, color_relleno, grosor_linea) {
        super(posicionesCursor, color_linea, color_relleno, grosor_linea);

        //lo que hace el math.abs es que de el valor absoluto y ya no en numeros negativos creo
        this.alto = Math.abs(posicionesCursor.finales.y - posicionesCursor.iniciales.y);
        this.ancho = Math.abs(posicionesCursor.finales.x - posicionesCursor.iniciales.x);
    }

    //contexto donde se va a dibujar
    Dibujar(ctx) {
        //para dicujar, la funcion del metodo es empezar un nuevo trazo, siempre al inicio del dibujo
        ctx.beginPath();
        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grosor_linea;

        ctx.fillRect(this.posicion_X, this.posicion_Y, this.ancho, this.alto);
        ctx.strokeRect(this.posicion_X, this.posicion_Y, this.ancho, this.alto);
        ctx.closePath();
    }
}

export class Sticker {
    constructor(posicionesCursor, urlImagen) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }

        this.x = Math.min(posicionesCursor.iniciales.x, posicionesCursor.finales.x);
        this.y = Math.min(posicionesCursor.iniciales.y, posicionesCursor.finales.y);

        this.alto = Math.abs(posicionesCursor.finales.y - posicionesCursor.iniciales.y);
        this.ancho = Math.abs(posicionesCursor.finales.x - posicionesCursor.iniciales.x);

        this.imagen = urlImagen;

        //para saber si la imagen si se cargo
        this.cargada = false;
        //y pues si si se pone verdadero y asi en dibujar no se sale por falta de imagen
        // si ya estaba cargada
        if (this.imagen.complete) {
            this.cargada = true;
        } else {
            this.imagen.onload = () => {
                this.cargada = true;
            };
        }
    }
    Dibujar(ctx) {
        if (!this.cargada) return; //no dibuja nada si no esta cargada la imagen

        ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);

    }
}

export class Circulo extends Figura {

    constructor(posicionesCursor, color_linea, color_relleno, grosor_linea) {
        super(posicionesCursor, color_linea, color_relleno, grosor_linea);

        //estos serias los catetos del triangulo para obtener la hipotenusa, en base a 
        // las distancias que se recorrienron en vertical y horizintal
        const catetoHorizontal = posicionesCursor.finales.x - posicionesCursor.iniciales.x;
        const catetoVertical = posicionesCursor.finales.y - posicionesCursor.iniciales.y;

        //aqui se saca la raiz cuadrada de cada cateto al cuadrado (osea multiplicado por si mismo)
        this.radio = Math.sqrt(catetoHorizontal * catetoHorizontal + catetoVertical * catetoVertical);
    }

    //contexto donde se va a dibujar
    Dibujar(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grosor_linea;

        ctx.arc(this.posicion_X, this.posicion_Y, this.radio, 0, Math.PI * 2)
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

export class Linea {
    //desde que se define se pueden inicializa para poder evitar errores, ya que si el usuario 
    // no da una respuesta por ejemplo color, por automantico seria negro
    constructor(posicionesCursor = {}, color_linea = "black", grosor_linea = 5) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        this.color_linea = color_linea;
        this.grosor_linea = grosor_linea;
        this.tipo = "dibujo"
    }

    Dibujar(ctx) {
        ctx.beginPath();

        //para que la linea sea redonda al igual que la union de las lineas
        ctx.lineCap = "round";
        ctx.lineJoin = "round"

        ctx.lineWidth = this.grosor_linea;
        ctx.strokeStyle = this.color_linea;

        ctx.moveTo(this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y);
        ctx.lineTo(this.posicionesCursor.finales.x, this.posicionesCursor.finales.y);
        ctx.stroke();
        ctx.closePath();
    }
}

export class Borrador {
    constructor(posicionesCursor, grosor_linea){
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        this.grosor_linea = grosor_linea;
    }
    Dibujar(ctx){
        ctx.save(); // guardar estado antes de borrar, el "modo" de dibujar

        ctx.globalCompositeOperation = "destination-out"; // "modo" borrar
        //borra los pixeles de lo que 
        // ya existe, por eso se uso con linea 
        // donde se dibuje con esta va a borrar los pixeles

        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = this.grosor_linea;

        ctx.moveTo(this.posicionesCursor.iniciales.x,this.posicionesCursor.iniciales.y);
        ctx.lineTo(this.posicionesCursor.finales.x,this.posicionesCursor.finales.y);

        ctx.stroke();
        ctx.closePath();

        ctx.restore(); //volver a normal, se regresa al estado anterior
    }
}

export class Corazon extends Figura {
    constructor(posicionesCursor, color_linea, color_relleno, grosor_linea) {
        super(posicionesCursor, color_linea, color_relleno, grosor_linea);
        this.x = posicionesCursor.iniciales.x;
        this.y = posicionesCursor.iniciales.y;

        this.ancho = posicionesCursor.finales.x - this.x;
        this.alto = posicionesCursor.finales.y - this.y;
    }
    Dibujar(ctx) {
        ctx.beginPath();
        // esquina de abajo donde incia
        ctx.moveTo(this.x + this.ancho / 2, this.y + this.alto);

        // Mitad izquierda hacia la hendidura
        ctx.bezierCurveTo(
            this.x - this.ancho / 2, this.y + this.alto / 2,
            this.x, this.y,
            this.x + this.ancho / 2, this.y + this.alto * 0.3
        );

        // Mitad derecha hacia la punta inferior
        ctx.bezierCurveTo(
            this.x + this.ancho, this.y,
            this.x + this.ancho * 1.5, this.y + this.alto / 2,
            this.x + this.ancho / 2, this.y + this.alto
        );
        ctx.lineCap = "round";
        ctx.lineJoin = "round"
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grosor_linea;
        ctx.stroke();
        ctx.fillStyle = this.color_relleno;
        ctx.fill();
        ctx.closePath();
    }
}

