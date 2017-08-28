function ViewModel()
{
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
    
    self.valoresAMostrar = ko.observableArray();
    
    self.cargarValoresAMostrar = function(data)
    {
        self.valoresAMostrar(_.map(data, function(i)
        {    
            var fechaUltimaMedicionMoment = moment(i.FechaUltimaMedicion, 'DD/MM/YYYY');
            var diferencia = fechaActual.diff(fechaUltimaMedicionMoment);
            var cantidadMilisegundos = moment.duration(diferencia).asMilliseconds();
            i.Valor = ko.observable(self.format(i.ValorInicialMedido + cantidadMilisegundos * i.ValorPorMilisegundo));
            return i;
        }));        
    };
    
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
    
    var mapGD = function(entry)
    {
        return {                                      
                    ValorInicialMedido  : parseFloat(entry.gsx$valorinicialmedido.$t.replace(",",".")),    
                    ValorPorMilisegundo : parseFloat(entry.gsx$valorpormilisegundo.$t.replace(",",".")),    
                    FechaUltimaMedicion : entry.gsx$fechaultimamedicion.$t,
                    Titulo              : entry.gsx$titulo.$t,
                    Class               : entry.gsx$class.$t,   
                    Unidad              : entry.gsx$unidad.$t,
                };
    };
    
    $.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/1yAF4OQ1EDY48OKdgicAFRF-0T7H36ZoAfOKRgjZqZQA/od6/public/values?alt=json',
        success: function(result)
        {
            self.cargarValoresAMostrar(_.map(result.feed.entry, mapGD));
        }
    });
    
    return self;
}

$(document).ready(function()
{
    ko.applyBindings(new ViewModel());
});