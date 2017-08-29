# https://datasciencearg.github.io/estadisticas/
Sitio web con estadísticas económicas de Argentina

¿Cómo se calculan los contadores?

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
