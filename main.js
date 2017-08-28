function ViewModel()
{
    // Fuente: https://www.pagina12.com.ar/45122-la-deuda-eterna
    // El gobierno de Macri ya emitió deuda por casi 100 mil millones
    // de dólares en casi veinte meses de gestión, superando el ritmo
    // de endeudamiento de la dictadura militar.
    
    var valorMensualDeudaExterna = 100000000000;
    var valorCentesimas = valorMensualDeudaExterna / (20 * 30 * 24 * 60 * 60 * 100); 
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
    
    self.DeudaExterna  = ko.observable(self.format(valorMensualDeudaExterna));
    self.FugaCapitales = ko.observable(2);
    self.GastoPublico  = ko.observable(3);
    
    setInterval(function()
    {
        var valorFinal = parseFloat(self.DeudaExterna().toString().replace(/\./g,"").replace(",",".")) + valorCentesimas;
        self.DeudaExterna(self.format(valorFinal));
    }, 100);
    
    return self;
}


$(document).ready(function()
{
    ko.applyBindings(new ViewModel());
});