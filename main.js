function ViewModel()
{
    // Fuente: https://www.pagina12.com.ar/45122-la-deuda-eterna (19/06/2017)
    // El gobierno de Macri ya emitió deuda por casi 100 mil millones
    // de dólares en casi veinte meses de gestión, superando el ritmo
    // de endeudamiento de la dictadura militar.
    var data = [{ 
                    ValorInicialMedido: 100000000000,
                    ValorPorMilisegundo: 1.9290123456790123, // SE CALCULA ASI: 100000000000 / (20 * 30 * 24 * 60 * 60 * 1000)
                    FechaUltimaMedicion: "19/06/2017",
                    Titulo: "Deuda Externa",
                    Class: "warning",
                    Unidad: "U$S"
                },
                {                                      // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    ValorInicialMedido: 10000000000,   // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    ValorPorMilisegundo: 1.003,        // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    FechaUltimaMedicion: "23/01/2017", // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    Titulo: "Fuga de Capitales",       // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    Class: "danger",                   // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    Unidad: "U$S"                      // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                },                                     // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                {                                      // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    ValorInicialMedido: 413131330,     // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    ValorPorMilisegundo: -0.00001,     // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    FechaUltimaMedicion: "12/11/2016", // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    Titulo: "Gasto Público",           // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    Class: "success",                  // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                    Unidad: "$"                        // DATOS DUMMY, BUSCAR LOS DATOS VERDADEROS
                }];

    var self = this;
    
    self.format = function(v)
    {
        return self.formatMoney(v, 2, ',', '.');
    };
    
    self.formatMoney = function(n, c, d, t)
    {
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    
    var fechaActual = moment();
    
    self.valoresAMostrar = ko.observableArray(_.map(data, function(i)
    {    
        var fechaUltimaMedicionMoment = moment(i.FechaUltimaMedicion, 'DD/MM/YYYY');
        var diferencia = fechaActual.diff(fechaUltimaMedicionMoment);
        var cantidadMilisegundos = moment.duration(diferencia).asMilliseconds();
        i.Valor = ko.observable(self.format(i.ValorInicialMedido + cantidadMilisegundos * i.ValorPorMilisegundo));
        return i;
    }));
    
    setInterval(function()
    {
        var v = self.valoresAMostrar();
        self.valoresAMostrar(_.map(v, function(i)
        {
            var valorFinal = parseFloat(i.Valor().toString().replace(/\./g,"").replace(",",".")) + (i.ValorPorMilisegundo * 100);
            i.Valor(self.format(valorFinal));
            return i;
        }));
    }, 100);
    
    return self;
}

$(document).ready(function()
{
    ko.applyBindings(new ViewModel());
});