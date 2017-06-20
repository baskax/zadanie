curl -XPOST 'localhost:9200/catalog/product/_bulk?pretty' -H 'Content-Type: application/json' -d'
{ "index" : { "_id" : "1" } }
{"category":"camera","brand":"Nikon", "model":"D7500","description":"Poszukiwanie idealnego ujęcia może Cię zaprowadzić w dowolne miejsce.","price":"6000.00","created":"2017-04-22","review":[{"author":"janek","rating":"4","comment":"troche drogi"},{"author":"andrzej","rating":"5","comment":"super"}],"more_info":{"iso":"up to 1640000","display_size":"3.2"}}
{ "index" : { "_id" : "2" } }
{"category":"camera","brand":"Canon", "model":"PowerShot G3 X","description":"Ciesz się wszechstronnością aparatu hybrydowego z 25-krotnym zoomem, który jest zarówno aparatem fotograficznym, jak i kamerą wideo.","price":"2999.00","created":"2015-08-10","review":[{"author":"jstefan","rating":"3","comment":"niewygodny"},{"author":"andrzej","rating":"5","comment":"super"}],"more_info":{"zoom":"25x","resolution":"20.2Mpx"}}
{ "index" : { "_id" : "3" } }
{"category":"camera","brand":"Canon", "model":"EOS 7D Mark II","price":"3500.00","created":"2014-09-15","review":[{"author":"mariusz","rating":"5","comment":"swietny aparat"},{"author":"andrzej","rating":"5","comment":"super"},{"author":"ktos","rating":"4","comment":"drogi"}],"more_info":{"iso":"100-16000","resolution":"20.2Mpx"}}
{ "index" : { "_id" : "4" } }
{"category":"camera","brand":"Kodak", "model":"EasyShare C182","description":"Kompaktowy aparat.","price":"600.00","created":"2009-07-29","review":[{"author":"mariusz","rating":"5","comment":"swietny aparat"},{"author":"andrzej","rating":"4","comment":"super"},{"author":"ktos","rating":"4","comment":"taki se"}],"more_info":{"iso":"3200","display_size":"3.2"}}
{ "index" : { "_id" : "5" } }
{"category":"tv","brand":"Samsung", "model":"UE32F4000","description":"Super ostry obraz.","price":"2300.00","created":"2017-01-29","review":[{"author":"janek","rating":"4","comment":"spoko telewizor"},{"author":"andrzej","rating":"5","comment":"super"}],"more_info":{"display_size":"32","power":"56W","weight":"5.6kg"}}
{ "index" : { "_id" : "6" } }
{"category":"tv","brand":"Sony", "model":"KD-55X9005A","description":"Dobry telewizor, lepszego nie ma.","price":"6000.00","created":"2017-04-22","review":[{"author":"janek","rating":"5","comment":"pelen wypas"},{"author":"andrzej","rating":"5","comment":"super"}],"more_info":{"power":"150W","display_size":"55"}}
{ "index" : { "_id" : "7" } }
{"category":"tv","brand":"Samsung", "model":"55K5500","description":"Brak hasła reklamowego.","price":"2500.00","created":"2017-04-22"}
{ "index" : { "_id" : "8" } }
{"category":"laptop","brand":"Lenovo", "model":"B50-80","price":"1949.00","created":"2017-04-22","review":[{"author":"janek","rating":"2","comment":"troche drogi"},{"author":"andrzej","rating":"5","comment":"super"}],"more_info":{"cpu":"Intel Core i3-5005U","ram":"4GB","display_size":"15.6","gpu":"Intel HD 5500"}}
{ "index" : { "_id" : "9" } }
{"category":"laptop","brand":"Dell", "model":"Vostro 3568","price":"2099.00","created":"2017-04-22","review":[{"author":"janusz","rating":"4","comment":"jest ok"},{"author":"krzychu","rating":"5","comment":"super"}],"more_info":{"cpu":"Intel Core i3-6006U","ram":"4GB","display_size":"15.6","gpu":"Intel HD 520"}}
{ "index" : { "_id" : "10" } }
{"category":"laptop","brand":"HP", "model":"17-y020wm","price":"1899.00","created":"2017-04-22","review":[{"author":"janek","rating":"5","comment":"troche drogi"},{"author":"andrzej","rating":"5","comment":"super"}],"more_info":{"cpu":"AMD A10-9600P","ram":"8GB","display_size":"17.3","gpu":"AMD Radeon R5"}}
'

