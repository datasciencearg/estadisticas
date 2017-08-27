function ViewModel()
{
    var self = this;
    
    self.DeudaExterna  = ko.observable(1);
    self.FugaCapitales = ko.observable(2);
    self.GastoPublico  = ko.observable(3);
    
    return self;
}


$(document).ready(function()
{
    ko.applyBindings(new ViewModel());
});