# https://datasciencearg.github.io/estadisticas/
## Sitio web con estadísticas económicas de Argentina

### ¿Cómo se calculan los contadores?

Los datos que se muestran en tiempo real se calculan en base a un valor inicial que se carga en la planilla de cálculo. En las fuentes mencionadas se buscan los datos de dos valores, junto con dos fechas, es decir un intervalo de tiempo.

Por ejemplo si una fuente dice: Se midieron 100 millones entre enero de 2015 y el 31 de diciembre 2017.

Quiere decir que hubo un crecimiento anual de 50 millones anuales:

50000000 / 365 => 136986 diarios
136986 / 24    => 5707 por hora
5707 / 3600    => 1.58 / segundo
1.58 / 1000    => 0.00158 / milisegundo.

En la planilla debe cargarse por lo tanto:

ValorPorMilisegundo = 0.00158
ValorInicialMedido  = 100000000
FechaUltimaMedicion = 31/12/2017

Entonces los valores mostrados por los contadores se calculan cada 100 ms en base a una extrapolación lineal basada en la recta de pendiente = ValorPorMilisegundo, ordenada al origen = ValorInicialMedido, y fase = FechaUltimaMedicion

### ¿Cómo agregar un contador?

Para agregar un contador, debe agregarse un registro al archivo Google Drive Spreadsheet https://docs.google.com/spreadsheets/d/1yAF4OQ1EDY48OKdgicAFRF-0T7H36ZoAfOKRgjZqZQA/edit#gid=0

Para tener acceso de escritura al mismo, debe comunicarse con alguno de los responsables del sitio

El campo class determina el color del contador, según las clases bootstrap https://v4-alpha.getbootstrap.com/utilities/colors/
