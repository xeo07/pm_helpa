// ═══════════════════════════════════════════════
//  TOPICS
// ═══════════════════════════════════════════════
const TOPICS = [
  { id:'vars',    name:'Переменные',          desc:'let, const, типы данных' },
  { id:'ops',     name:'Операторы и условия', desc:'==, ===, &&, ||, if/else' },
  { id:'loops',   name:'Циклы',               desc:'for, while, forEach' },
  { id:'funcs',   name:'Функции',             desc:'объявление, вызов, return, scope' },
  { id:'async',   name:'Таймеры / localStorage', desc:'setTimeout, setInterval, JSON' },
  { id:'dom',     name:'DOM и события',       desc:'querySelector, addEventListener' },
  { id:'errors',  name:'Найди ошибку',        desc:'Разбор типичных багов в коде' },
  { id:'classes', name:'classList и style',   desc:'add, remove, toggle, style' },
  { id:'vue-basics', name:'Vue — основы',     desc:'ref, reactive, computed, шаблон' },
  { id:'vue-comp',   name:'Vue — компоненты', desc:'props, emit, импорт' },
  { id:'vue-router', name:'Vue — роутер',     desc:'useRouter, useRoute, guards, meta' },
  { id:'vue-composables', name:'Vue — composables', desc:'use-функции, переиспользование логики' },
];

// ═══════════════════════════════════════════════
//  QUESTIONS
// ═══════════════════════════════════════════════
const Q = [
  // ── VARS ──
  {id:1,t:'vars',
   q:'Каким тегом подключается JS в HTML файл?',
   opts:[{s:'<link src="script.js">',c:false},{s:'<scr'+'ipt src="script.js"></'+'script>',c:true},{s:'<js src="script.js">',c:false},{s:'<import src="script.js">',c:false}],
   e:'Тег <code>&lt;script&gt;</code> — единственный способ добавить JS. Атрибут <code>src</code> — путь к файлу. Можно писать код прямо внутри тега без <code>src</code>. Для ES-модулей добавляют <code>type="module"</code>.'},

  {id:6,t:'vars',
   q:'В чём отличие между let и const?',
   opts:[{s:'let — для чисел, const — для строк',c:false},{s:'let позволяет переприсваивание, const — нет',c:true},{s:'const работает быстрее',c:false},{s:'Никакого отличия нет',c:false}],
   e:'Оба создают переменную, видимую только в своём блоке <code>{}</code>. Разница одна: <code>let</code> можно изменить позже, <code>const</code> нельзя. <strong>Нюанс:</strong> если в const хранится объект, его <em>свойства</em> менять можно — запрещено только переприсвоить саму переменную.'},

  {id:2,t:'vars',
   q:'Что выведет консоль?',
   code:'let a = 5\nlet b = 6\nlet c = 7\na = 1\nb = 2\nc = 3\nconsole.log(b);',
   opts:[{s:'6',c:false},{s:'2',c:true},{s:'Ошибка TypeError',c:false},{s:'undefined',c:false}],
   e:'<code>let</code> разрешает менять значение. <code>b</code> сначала было 6, потом стало <strong>2</strong> — именно это и выведется.'},

  {id:3,t:'vars',
   q:'Что выведет консоль? (const)',
   code:'const a = 5\nconst b = 6\nconst c = 7\na = 1  // ← здесь сломается!\nb = 2\nconsole.log(b);',
   opts:[{s:'6',c:false},{s:'2',c:false},{s:'TypeError: Assignment to constant variable',c:true},{s:'undefined',c:false}],
   e:'<code>const</code> нельзя переприсвоить. Строка <code>a = 1</code> сразу кидает <strong>TypeError</strong>, скрипт останавливается — до <code>console.log</code> даже не доходит.'},

  {id:5,t:'vars',
   q:'Что выведет консоль? (порядок операций)',
   code:'const a = 1\nlet b = 2\nconst c = 3\nconsole.log(a + c * b);',
   opts:[{s:'8',c:false},{s:'7',c:true},{s:'6',c:false},{s:'Ошибка',c:false}],
   e:'Умножение <strong>всегда</strong> раньше сложения. Сначала: <code>c * b = 3 * 2 = 6</code>, затем: <code>a + 6 = 1 + 6 = <strong>7</strong></code>.'},

  // ── OPS ──
  {id:10,t:'ops',
   q:'Что выведет консоль? (= вместо == в if)',
   code:'let a = 5\nlet b = 6\nif (a=b) {\n  console.log("Да");\n} else {\n  console.log("Нет");\n}',
   opts:[{s:'"Нет"',c:false},{s:'"Да"',c:true},{s:'Ошибка',c:false},{s:'undefined',c:false}],
   e:'В условии стоит <code>=</code> (присваивание), а не <code>==</code>! <code>a</code> получает значение <code>6</code>, а 6 — это «истина» (truthy), поэтому выполняется if → <strong>"Да"</strong>. Классическая ловушка!'},

  {id:11,t:'ops',
   q:'Что выведет? (== числа)',
   code:'let a = 5, b = 6\nif (a==b) { console.log("Да"); }\nelse { console.log("Нет"); }',
   opts:[{s:'"Да"',c:false},{s:'"Нет"',c:true},{s:'Ошибка',c:false},{s:'5',c:false}],
   e:'5 и 6 — разные числа. <code>5 == 6</code> → <strong>false</strong> → выполняется else → <strong>"Нет"</strong>.'},

  {id:12,t:'ops',
   q:'Что выведет? (== число и строка)',
   code:'let a = 1\nlet b = "1"\nif (a==b) { console.log("Да"); }\nelse { console.log("Нет"); }',
   opts:[{s:'"Нет"',c:false},{s:'"Да"',c:true},{s:'Ошибка',c:false},{s:'undefined',c:false}],
   e:'<code>==</code> приводит типы: строка <code>"1"</code> превращается в число <code>1</code>, и <code>1 == 1</code> → <strong>true</strong>. Поэтому <strong>"Да"</strong>. Это нестрогое сравнение.'},

  {id:13,t:'ops',
   q:'Что выведет? (=== число и строка)',
   code:'let a = 1\nlet b = "1"\nif (a===b) { console.log("Да"); }\nelse { console.log("Нет"); }',
   opts:[{s:'"Да"',c:false},{s:'"Нет"',c:true},{s:'Ошибка',c:false},{s:'true',c:false}],
   e:'<code>===</code> — строгое сравнение: проверяет и значение, и тип. <code>1</code> — число, <code>"1"</code> — строка. Типы разные → false → <strong>"Нет"</strong>. Правило: всегда используй <code>===</code>.'},

  {id:14,t:'ops',
   q:'Что выведет? (оператор && — И)',
   code:'let a=3, b=4, c=3\nif (a==b && a==c) { console.log("Да"); }\nelse { console.log("Нет"); }',
   opts:[{s:'"Да"',c:false},{s:'"Нет"',c:true},{s:'Ошибка',c:false},{s:'true',c:false}],
   e:'<code>&&</code> (И) требует что <strong>оба</strong> условия истинны. <code>a==b</code> → 3==4 → false. Как только одно ложь — всё ложь, второе не проверяется → <strong>"Нет"</strong>.'},

  {id:15,t:'ops',
   q:'Что выведет? (оператор || — ИЛИ)',
   code:'let a=3, b=4, c=3\nif (a==b || a==c) { console.log("Да"); }\nelse { console.log("Нет"); }',
   opts:[{s:'"Нет"',c:false},{s:'"Да"',c:true},{s:'Ошибка',c:false},{s:'false',c:false}],
   e:'<code>||</code> (ИЛИ) требует что хотя бы одно истинно. <code>a==b</code> → false, но <code>a==c</code> → 3==3 → <strong>true</strong>. Одного true достаточно → <strong>"Да"</strong>.'},

  {id:16,t:'ops',
   q:'Какая разница между =, == и ===?',
   opts:[{s:'= сравнивает, == строго, === нестрого',c:false},{s:'= присваивает, == нестрогое сравнение, === строгое',c:true},{s:'Все три — это сравнение, разный стиль',c:false},{s:'= и == одинаковы',c:false}],
   e:'• <code>=</code> — записывает значение: <code>a = 5</code><br>• <code>==</code> — сравнивает, приводя типы: <code>1 == "1"</code> → true<br>• <code>===</code> — строгое, без приведения: <code>1 === "1"</code> → false'},

  // ── LOOPS ──
  {id:17,t:'loops',
   q:'В чём разница между for, while и forEach?',
   opts:[{s:'forEach самый быстрый',c:false},{s:'for — счётчик, while — условие, forEach — метод массива',c:true},{s:'while нельзя с массивами',c:false},{s:'Это одно и то же',c:false}],
   e:'• <code>for</code>: знаем сколько итераций — пишем счётчик<br>• <code>while</code>: крутимся пока условие истинно<br>• <code>forEach</code>: только для массивов, нельзя прервать через break'},

  {id:18,t:'loops',
   q:'Какое последнее значение выведется в консоль?',
   code:'let a = 1\nfor (; a < 10; a++) {\n  console.log(a);\n}\nconsole.log(a+=10);',
   opts:[{s:'9',c:false},{s:'20',c:true},{s:'10',c:false},{s:'19',c:false}],
   e:'Цикл выводит 1..9. Когда a=10 условие <code>a&lt;10</code> ложно — стоп. После цикла a=10, затем <code>a+=10</code> → 10+10 = <strong>20</strong>.'},

  {id:19,t:'loops',
   q:'Что выведется последним? (let в for)',
   code:'for (let a = 1; a < 10; a++) {\n  console.log(a);\n}\nconsole.log(a+=10); // a здесь не существует!',
   opts:[{s:'20',c:false},{s:'9 и потом ReferenceError',c:true},{s:'10',c:false},{s:'undefined',c:false}],
   e:'Когда <code>a</code> объявлена в скобках <code>for(let a...)</code>, она живёт <strong>только внутри цикла</strong>. Снаружи её нет. <code>console.log(a+=10)</code> → <strong>ReferenceError: a is not defined</strong>.'},

  {id:20,t:'loops',
   q:'Что выведет while-цикл?',
   code:'let a = 1\nwhile (a<10) {\n  a++          // сначала увеличить\n  console.log(a); // потом вывести\n}',
   opts:[{s:'1, 2 ... 9',c:false},{s:'2, 3 ... 10',c:true},{s:'1, 2 ... 10',c:false},{s:'2, 3 ... 9',c:false}],
   e:'Внутри цикла <code>a</code> сначала увеличивается, потом выводится. При первом заходе: a=1 → a++=2 → выводим <strong>2</strong>. Когда a=9: a++=10 → выводим <strong>10</strong> → 10&lt;10 → false → стоп. Итого: <strong>2..10</strong>.'},

  {id:21,t:'loops',
   q:'Что выведет forEach с числами и строками?',
   code:'let a = [1,2,3,4,"5","6"]\nlet b = 0\na.forEach(el => { b += el });\nconsole.log(b);',
   opts:[{s:'21',c:false},{s:'"1056"',c:true},{s:'"10"',c:false},{s:'Ошибка',c:false}],
   e:'1+2+3+4 = 10. Затем b=10, el="5" — это строка! Число + строка = конкатенация: <code>10 + "5" = "105"</code>. Потом <code>"105" + "6" = "1056"</code>. Результат — <strong>строка "1056"</strong>, не число!'},

  {id:29,t:'loops',
   q:'Какой обязательный элемент любого цикла?',
   opts:[{s:'Переменная-счётчик',c:false},{s:'Условие завершения',c:true},{s:'Тело цикла',c:false},{s:'Начальное значение',c:false}],
   e:'Условие завершения — <strong>единственное</strong> что обязательно. Без него цикл бесконечный и повесит браузер. В <code>for</code> — второй элемент в скобках. В <code>while</code> — после слова while.'},

  // ── FUNCS ──
  {id:89,t:'funcs',
   q:'В чём смысл return?',
   opts:[{s:'Перезапускает функцию',c:false},{s:'Завершает функцию и возвращает значение туда, где она вызвана',c:true},{s:'Выводит значение в консоль',c:false},{s:'Останавливает весь скрипт',c:false}],
   e:'<code>return</code> делает две вещи: <strong>1)</strong> прекращает работу функции (код после не выполнится), <strong>2)</strong> передаёт значение туда, где функция была вызвана. Без return функция возвращает <code>undefined</code>.'},

  {id:9,t:'funcs',
   q:'Что выведет консоль? (функция без скобок)',
   code:'let a = 10\nfunction a1() { a = a * 10 }\nfunction a3() { a *= 10 }\nconsole.log(a3);',
   opts:[{s:'100',c:false},{s:'Код функции a3',c:true},{s:'10',c:false},{s:'undefined',c:false}],
   e:'<code>a3</code> без скобок — это ссылка на функцию, а не её вызов. <code>console.log</code> выведет саму функцию (её текст/код). Чтобы вызвать — нужны скобки: <code>a3()</code>.'},

  {id:31,t:'funcs',
   q:'Что выведет консоль?',
   code:'function a() { console.log("a"); }\nfunction b() { console.log("b"); }\nfunction c() { console.log("c"); }\nb\na\nc',
   opts:[{s:'"b","a","c"',c:false},{s:'Ничего',c:true},{s:'Ошибка',c:false},{s:'undefined x3',c:false}],
   e:'<code>b</code>, <code>a</code>, <code>c</code> без скобок — просто обращения к переменным-функциям. Функции объявлены, но <strong>не вызваны</strong>. Нет <code>()</code> — нет вывода.'},

  {id:32,t:'funcs',
   q:'Что выведет консоль? (со скобками)',
   code:'function a() { console.log("a"); }\nfunction b() { console.log("b"); }\nfunction c() { console.log("c"); }\nb()\na()\nc()',
   opts:[{s:'"a","b","c"',c:false},{s:'"b","a","c"',c:true},{s:'Ничего',c:false},{s:'Ошибка',c:false}],
   e:'Скобки <code>()</code> вызывают функцию. Выполняются по порядку сверху вниз: <code>b()</code> → "b", <code>a()</code> → "a", <code>c()</code> → "c". Результат: <strong>"b", "a", "c"</strong>.'},

  {id:33,t:'funcs',
   q:'Что выведет console.log(num)? (функция не вызвана)',
   code:'let num = 10\nfunction a() { num += 10 }\nconsole.log(num);',
   opts:[{s:'20',c:false},{s:'10',c:true},{s:'undefined',c:false},{s:'Ошибка',c:false}],
   e:'Функция <code>a</code> объявлена, но нигде не вызывается — <code>a()</code> нет. Код внутри неё не выполняется. <code>num</code> остаётся <strong>10</strong>.'},

  {id:34,t:'funcs',
   q:'Что выведет console.log(num)? (функция вызвана)',
   code:'let num = 10\nfunction a() { num += 10 }\na()\nconsole.log(num);',
   opts:[{s:'10',c:false},{s:'20',c:true},{s:'undefined',c:false},{s:'Ошибка',c:false}],
   e:'Функция <code>a()</code> вызвана! Внутри неё <code>num += 10</code> изменяет <strong>внешнюю</strong> переменную (замыкание). <code>num</code> = 10+10 = <strong>20</strong>.'},

  {id:35,t:'funcs',
   q:'Что произойдёт? (num объявлена внутри функции)',
   code:'function a() {\n  let num = 10  // локальная!\n  num += 10\n}\na()\nconsole.log(num);',
   opts:[{s:'20',c:false},{s:'10',c:false},{s:'ReferenceError: num is not defined',c:true},{s:'undefined',c:false}],
   e:'<code>let num</code> внутри функции — <strong>локальная переменная</strong>. Живёт только пока работает функция, потом исчезает. Снаружи переменной <code>num</code> не существует → <strong>ReferenceError</strong>.'},

  {id:36,t:'funcs',
   q:'В чём отличие функций от методов?',
   opts:[{s:'Метод работает быстрее',c:false},{s:'Метод — функция внутри объекта, вызывается через точку',c:true},{s:'Функции не принимают аргументы',c:false},{s:'Никакой разницы',c:false}],
   e:'• <strong>Функция</strong>: сама по себе, вызывается напрямую: <code>sayHi()</code><br>• <strong>Метод</strong>: живёт в объекте, вызывается через точку: <code>объект.sayHi()</code><br>Пример: <code>console.log()</code> — <code>log</code> это метод объекта <code>console</code>.'},

  // ── ASYNC ──
  {id:22,t:'async',
   q:'Какая команда сохраняет данные в localStorage?',
   opts:[{s:'localStorage.save("ключ","значение")',c:false},{s:'localStorage.setItem("ключ","значение")',c:true},{s:'localStorage.put("ключ","значение")',c:false},{s:'localStorage.write("ключ","значение")',c:false}],
   e:'<code>localStorage.setItem("ключ", "значение")</code> — записывает. Данные хранятся в браузере бессрочно. Запомни пары: <strong>set → get → remove → clear</strong>.'},

  {id:23,t:'async',
   q:'Какая команда достаёт данные из localStorage?',
   opts:[{s:'localStorage.readItem("ключ")',c:false},{s:'localStorage.getItem("ключ")',c:true},{s:'localStorage.fetch("ключ")',c:false},{s:'localStorage.get("ключ")',c:false}],
   e:'<code>localStorage.getItem("ключ")</code> — возвращает строку. Если ключа нет — вернёт <code>null</code>. Данные всегда строки — для объектов нужен <code>JSON.parse</code>.'},

  {id:24,t:'async',
   q:'Какая команда удаляет ВСЕ данные из localStorage?',
   opts:[{s:'localStorage.deleteAll()',c:false},{s:'localStorage.clear()',c:true},{s:'localStorage.removeAll()',c:false},{s:'localStorage.flush()',c:false}],
   e:'<code>localStorage.clear()</code> — стирает всё. Необратимо! Для одного элемента — <code>localStorage.removeItem("ключ")</code>.'},

  {id:25,t:'async',
   q:'Какая команда удаляет КОНКРЕТНЫЙ элемент из localStorage?',
   opts:[{s:'localStorage.delete("ключ")',c:false},{s:'localStorage.removeItem("ключ")',c:true},{s:'localStorage.remove("ключ")',c:false},{s:'localStorage.clear("ключ")',c:false}],
   e:'<code>localStorage.removeItem("ключ")</code> — удаляет только одну запись. <code>clear()</code> без аргументов удаляет всё. <code>removeItem</code> — точечно.'},

  {id:26,t:'async',
   q:'Как хранить объект/массив в localStorage?',
   opts:[{s:'Передать объект напрямую в setItem',c:false},{s:'JSON.stringify при сохранении, JSON.parse при чтении',c:true},{s:'Перебрать свойства вручную',c:false},{s:'localStorage умеет сам хранить объекты',c:false}],
   e:'localStorage хранит <strong>только строки</strong>. Объект напрямую → <code>"[object Object]"</code> — мусор!<br>Сохранить: <code>localStorage.setItem("k", JSON.stringify(obj))</code><br>Прочитать: <code>JSON.parse(localStorage.getItem("k"))</code>'},

  {id:27,t:'async',
   q:'В чём измеряется время в setTimeout и setInterval?',
   opts:[{s:'В секундах',c:false},{s:'В миллисекундах',c:true},{s:'В микросекундах',c:false},{s:'В тиках',c:false}],
   e:'Всегда <strong>миллисекунды</strong>. 1 секунда = 1000 мс. <code>setTimeout(fn, 1000)</code> — 1 секунда, <code>setTimeout(fn, 500)</code> — полсекунды.'},

  {id:28,t:'async',
   q:'В каком порядке выведутся числа?',
   code:'setTimeout(() => { console.log(1); }, 1000);\nsetTimeout(() => { console.log(2); }, 100);\nconsole.log(3);',
   opts:[{s:'1, 2, 3',c:false},{s:'3, 1, 2',c:false},{s:'3, 2, 1',c:true},{s:'2, 3, 1',c:false}],
   e:'Синхронный код выполняется первым, без ожидания → <strong>3</strong>. Потом через 100мс → <strong>2</strong>. Через 1000мс → <strong>1</strong>. Итого: <strong>3, 2, 1</strong>.'},

  {id:30,t:'async',
   q:'Как остановить setInterval / setTimeout?',
   opts:[{s:'interval.stop()',c:false},{s:'clearInterval(id) / clearTimeout(id)',c:true},{s:'stopInterval(id)',c:false},{s:'delete interval',c:false}],
   e:'При создании таймер возвращает ID: <code>const id = setInterval(fn, 1000)</code>. Остановить: <code>clearInterval(id)</code> или <code>clearTimeout(id)</code>. Без сохранения ID — остановить невозможно!'},

  // ── DOM ──
  {id:37,t:'dom',
   q:'Какой объект представляет всю HTML-страницу?',
   opts:[{s:'window',c:false},{s:'document',c:true},{s:'html',c:false},{s:'body',c:false}],
   e:'<code>document</code> — объект всей загруженной страницы. Через него ищут элементы: <code>document.getElementById</code>, <code>document.querySelector</code>. <code>window</code> — это сам браузер, <code>document</code> — страница внутри.'},

  {id:38,t:'dom',
   q:'Какой метод ищет элемент по CSS-селектору?',
   opts:[{s:'document.find(".class")',c:false},{s:'document.querySelector(".class")',c:true},{s:'document.get(".class")',c:false},{s:'document.search(".class")',c:false}],
   e:'<code>document.querySelector("селектор")</code> — находит первый подходящий элемент. Принимает любой CSS: <code>".class"</code>, <code>"#id"</code>, <code>"div.active"</code>. Вернёт элемент или <code>null</code>. <code>querySelectorAll</code> — все совпадения.'},

  {id:39,t:'dom',
   q:'Как называется метод подписки на события?',
   opts:[{s:'element.onEvent("click", fn)',c:false},{s:'element.addEventListener("click", fn)',c:true},{s:'element.listenTo("click", fn)',c:false},{s:'element.on("click", fn)',c:false}],
   e:'<code>addEventListener("тип", функция)</code> — подписываемся на событие. Когда событие произошло — вызывается функция. Можно навесить несколько обработчиков на одно событие. Убрать: <code>removeEventListener</code>.'},

  {id:40,t:'dom',
   q:'Какие два обязательных параметра у addEventListener?',
   opts:[{s:'Элемент и функция',c:false},{s:'Тип события и функция-обработчик',c:true},{s:'Имя и значение',c:false},{s:'CSS-класс и колбэк',c:false}],
   e:'1) <strong>Тип события</strong> — строка: <code>"click"</code>, <code>"input"</code>, <code>"keydown"</code><br>2) <strong>Функция-обработчик</strong> — что делать когда событие произошло<br>Пример: <code>btn.addEventListener("click", handleClick)</code>'},

  {id:41,t:'dom',
   q:'Какое свойство отвечает за значение поля ввода?',
   opts:[{s:'element.content',c:false},{s:'element.value',c:true},{s:'element.text',c:false},{s:'element.data',c:false}],
   e:'<code>element.value</code> — для input, textarea, select. Читать: <code>let text = input.value</code>. Записывать: <code>input.value = "Привет"</code>. Для текста в div/span — используй <code>textContent</code>.'},

  {id:42,t:'dom',
   q:'Какое свойство отвечает за текстовое содержимое элемента?',
   opts:[{s:'element.value',c:false},{s:'element.textContent',c:true},{s:'element.src',c:false},{s:'element.data',c:false}],
   e:'• <code>textContent</code> — только текст, безопасно<br>• <code>innerHTML</code> — текст + HTML разметка (опасно для ввода пользователя)<br>• <code>innerText</code> — похож на textContent, учитывает CSS-стили<br>Для вывода текста — всегда <code>textContent</code>.'},

  // ── ERRORS ──
  {id:43,t:'errors',
   q:'Найди ошибку: .value читается при загрузке',
   code:'const el = document.getElementById("inp").value // ← ошибка!\nfunction logVal() {\n  out.textContent = el\n}\nbtn.addEventListener("click", logVal)',
   opts:[{s:'Неверно вызван addEventListener',c:false},{s:'.value читается один раз при загрузке, а не в момент клика',c:true},{s:'Функция без аргументов',c:false},{s:'Ошибки нет',c:false}],
   e:'<code>.value</code> прочитан <strong>сразу при загрузке</strong> — поле пустое, <code>el</code> хранит пустую строку навсегда.<br><strong>Правильно:</strong><br><code>const el = document.getElementById("inp")</code><br><code>out.textContent = el.value // ← внутри logVal</code>'},

  {id:44,t:'errors',
   q:'Найди ошибку: id с разным регистром',
   code:'// HTML: id="Btn", id="Inp", id="Out"\nconst btn = document.getElementById("btn") // ← ошибка!',
   opts:[{s:'getElementById не существует',c:false},{s:'Регистр id в HTML и JS не совпадает',c:true},{s:'Нужен querySelector',c:false},{s:'Ошибки нет',c:false}],
   e:'В HTML: <code>id="Btn"</code> (большая Б). В JS: <code>getElementById("btn")</code> (маленькая б). <code>getElementById</code> чувствителен к регистру → элемент не найден → <code>null</code>. Потом <code>null.addEventListener</code> → <strong>TypeError</strong>.'},

  {id:45,t:'errors',
   q:'Найди ошибку: скрипт не подключён',
   code:'<!-- HTML: -->\n<input id="inp">\n<button id="btn">Нажать</button>\n<!-- нет <script src="script.js"> ! -->\n\n/* script.js: */\nbtn.addEventListener("click", logVal)',
   opts:[{s:'Код в JS написан неверно',c:false},{s:'В HTML нет тега <script src="script.js">',c:true},{s:'Нужен document.querySelector',c:false},{s:'Ошибки нет',c:false}],
   e:'JS-код правильный, но HTML о нём не знает. Без <code>&lt;script src="script.js"&gt;&lt;/script&gt;</code> файл никогда не загрузится. Кнопка есть — но клики не обрабатываются.'},

  {id:46,t:'errors',
   q:'Найди ошибку: input без id',
   code:'<!-- HTML: <input type="text"> (без id!) -->\nconst el = document.getElementById("input") // ← ошибка',
   opts:[{s:'Неверный тип input',c:false},{s:'У input нет id, getElementById вернёт null',c:true},{s:'Нужен getElementsByTagName',c:false},{s:'Ошибки нет',c:false}],
   e:'У <code>&lt;input&gt;</code> нет атрибута <code>id</code>. <code>getElementById("input")</code> ищет несуществующий id → возвращает <code>null</code>. Потом <code>null.value</code> → <strong>TypeError</strong>. Решение: добавить <code>id="inp"</code> в HTML.'},

  {id:47,t:'errors',
   q:'Найди ошибку в addEventListener',
   code:'btn.addEventListener("click, logVal") // ← что не так?',
   opts:[{s:'Неверное имя события',c:false},{s:'Оба параметра слиты в одну строку вместо двух аргументов',c:true},{s:'logVal не определена',c:false},{s:'Ошибки нет',c:false}],
   e:'<code>addEventListener</code> принимает <strong>два отдельных аргумента</strong>. Здесь они слиты в одну строку — это один аргумент. Функция-обработчик вообще не передаётся!<br>Правильно: <code>btn.addEventListener("click", logVal)</code>'},

  {id:48,t:'errors',
   q:'Найди ошибку: el без .value',
   code:'function logVal() {\n  out.textContent = el // ← ошибка!\n}',
   opts:[{s:'Функция без return',c:false},{s:'el — DOM-элемент, нужно el.value чтобы получить текст',c:true},{s:'textContent нужно заменить на innerHTML',c:false},{s:'Ошибки нет',c:false}],
   e:'<code>el</code> — это объект (HTML-элемент). Если присвоить объект в <code>textContent</code>, JS превратит его в строку: <code>"[object HTMLInputElement]"</code> — это не текст из поля!<br>Правильно: <code>out.textContent = el.value</code>'},

  {id:49,t:'errors',
   q:'Найди ошибку: logVal() со скобками',
   code:'btn.addEventListener("click", logVal()) // ← ошибка!',
   opts:[{s:'Неверное название события',c:false},{s:'logVal() вызывается сразу, а не передаётся как обработчик',c:true},{s:'Нужно передать строку "logVal"',c:false},{s:'Ошибки нет',c:false}],
   e:'<code>logVal()</code> со скобками — вызов прямо сейчас. Функция выполнится при загрузке, вернёт <code>undefined</code>. В addEventListener попадает <code>undefined</code> → клики ничего не делают.<br>Правильно: <code>logVal</code> без скобок.'},

  {id:50,t:'errors',
   q:'Найди ошибку: опечатка в событии',
   code:'btn.addEventListener("clack", logVal) // ← что не так?',
   opts:[{s:'logVal должна быть стрелочной',c:false},{s:'Опечатка: "clack" не существует, нужно "click"',c:true},{s:'btn должен быть document',c:false},{s:'Ошибки нет',c:false}],
   e:'<code>"clack"</code> — несуществующий тип события. Браузер <strong>не выдаёт ошибку</strong>, просто тихо игнорирует. Обработчик навешен, но никогда не сработает. Нужно <strong>"click"</strong>. Такие ошибки очень сложно найти!'},

  // ── CLASSES ──
  {id:51,t:'classes',
   q:'Как называется свойство элемента со списком CSS-классов?',
   opts:[{s:'element.className',c:false},{s:'element.classList',c:true},{s:'element.classes',c:false},{s:'element.css',c:false}],
   e:'<code>classList</code> — объект со списком классов элемента. Удобнее чем <code>className</code> (строка), потому что у него есть методы: <code>add</code>, <code>remove</code>, <code>toggle</code>, <code>contains</code>.'},

  {id:52,t:'classes',
   q:'Как добавить CSS-класс к элементу?',
   opts:[{s:'element.class = "имя"',c:false},{s:'element.classList.add("имя")',c:true},{s:'element.addClass("имя")',c:false},{s:'element.classList = "имя"',c:false}],
   e:'<code>element.classList.add("имя-класса")</code>. Если класс уже есть — ничего не произойдёт, дублей не будет. Можно добавить несколько: <code>classList.add("one", "two")</code>.'},

  {id:53,t:'classes',
   q:'Как удалить CSS-класс у элемента?',
   opts:[{s:'element.classList.delete("имя")',c:false},{s:'element.classList.remove("имя")',c:true},{s:'element.removeClass("имя")',c:false},{s:'element.class.remove("имя")',c:false}],
   e:'<code>element.classList.remove("имя-класса")</code>. Если класса нет — ошибки не будет. Проверить наличие: <code>classList.contains("имя")</code> → true/false.'},

  {id:54,t:'classes',
   q:'Как переключить CSS-класс (если есть — убрать, нет — добавить)?',
   opts:[{s:'element.classList.switch("имя")',c:false},{s:'element.classList.toggle("имя")',c:true},{s:'element.classList.flip("имя")',c:false},{s:'element.classList.change("имя")',c:false}],
   e:'<code>element.classList.toggle("имя")</code> — умный переключатель. Есть класс → удалит. Нет → добавит. Идеально для кнопок "показать/скрыть", "активно/неактивно".'},

  {id:55,t:'classes',
   q:'Как изменить конкретное CSS-свойство элемента через JS?',
   opts:[{s:'element.css.color = "red"',c:false},{s:'element.style.color = "red"',c:true},{s:'element.setStyle("color","red")',c:false},{s:'element.applyStyle("color:red")',c:false}],
   e:'<code>element.style.свойство = "значение"</code> — задаёт inline-стиль. CSS-свойства в camelCase: <code>background-color</code> → <code>backgroundColor</code>, <code>font-size</code> → <code>fontSize</code>. Пример: <code>el.style.display = "none"</code>.'},

  // ── VUE BASICS ──
  {id:56,t:'vue-basics',
   q:'Какой вид реактивных переменных используется для одного значения?',
   opts:[{s:'reactive()',c:false},{s:'ref()',c:true},{s:'computed()',c:false},{s:'useState()',c:false}],
   e:'<code>ref()</code> оборачивает одно значение: <code>const count = ref(0)</code>. В скрипте через <code>.value</code>: <code>count.value++</code>. В шаблоне <code>.value</code> не нужно: просто <code>{{ count }}</code>.'},

  {id:57,t:'vue-basics',
   q:'Какой вид реактивных переменных для группы связанных значений?',
   opts:[{s:'ref()',c:false},{s:'reactive()',c:true},{s:'computed()',c:false},{s:'watch()',c:false}],
   e:'<code>reactive()</code> делает реактивным целый объект: <code>const user = reactive({ name: "Иван", age: 20 })</code>. Обращение без .value: <code>user.name = "Вася"</code>. Удобно для форм, профилей.'},

  {id:58,t:'vue-basics',
   q:'Какой вид реактивных переменных вычисляется на основе других?',
   opts:[{s:'ref()',c:false},{s:'reactive()',c:false},{s:'computed()',c:true},{s:'watch()',c:false}],
   e:'<code>computed()</code> — вычисляемое значение. Принимает функцию, возвращает результат. Пример: <code>const double = computed(() => count.value * 2)</code>. Автоматически пересчитывается когда зависимости изменились. Кешируется.'},

  {id:59,t:'vue-basics',
   q:'При каком условии computed() пересчитывается?',
   opts:[{s:'При каждом рендере',c:false},{s:'Когда изменяется хотя бы одна реактивная переменная внутри',c:true},{s:'Только при явном вызове .recalculate()',c:false},{s:'По таймеру',c:false}],
   e:'Vue отслеживает какие ref/reactive используются внутри computed. Изменилась любая из них → computed пересчитается. Не изменилась → вернёт кеш без лишних вычислений.'},

  {id:60,t:'vue-basics',
   q:'Что нужно сделать перед использованием ref, reactive, computed?',
   opts:[{s:'Они глобальные, ничего не нужно',c:false},{s:'Импортировать из "vue": import { ref } from "vue"',c:true},{s:'Установить отдельный пакет',c:false},{s:'Написать use("reactivity")',c:false}],
   e:'Нужно импортировать из пакета vue:<br><code>import { ref, reactive, computed } from "vue"</code><br>Без этого Vue не знает откуда брать эти функции → ошибка "ref is not defined".'},

  {id:61,t:'vue-basics',
   q:'Как в скрипте обращаться к ref-переменным?',
   opts:[{s:'Напрямую: count++',c:false},{s:'Через .value: count.value++',c:true},{s:'Через .get(): count.get()',c:false},{s:'Через $ref(count)',c:false}],
   e:'В скрипте ref — это обёртка, значение живёт в <code>.value</code>: <code>count.value++</code>. В шаблоне Vue автоматически разворачивает .value, поэтому там пишут просто <code>{{ count }}</code>.'},

  {id:62,t:'vue-basics',
   q:'Как в скрипте обращаться к reactive-переменным?',
   opts:[{s:'Через .value: state.value.count++',c:false},{s:'Напрямую через свойства: state.count++',c:true},{s:'Через $get: state.$get("count")',c:false},{s:'Деструктурировать каждый раз',c:false}],
   e:'<code>reactive</code> возвращает Proxy-объект, без .value: <code>state.count++</code>. <strong>Важно:</strong> не деструктурировать — <code>const { count } = state</code> потеряет реактивность!'},

  {id:63,t:'vue-basics',
   q:'Как вывести значение скрипта в шаблон Vue?',
   opts:[{s:'<output>{{ значение }}</output>',c:false},{s:'{{ значение }} внутри шаблона',c:true},{s:'<print>значение</print>',c:false},{s:'document.write(значение)',c:false}],
   e:'Двойные фигурные скобки <code>{{ }}</code> — интерполяция в Vue. <code>{{ name }}</code> — вставит значение переменной name. Обновляется реактивно: изменилась переменная → текст обновился автоматически.'},

  {id:64,t:'vue-basics',
   q:'Как называется атрибут, начинающийся с "v-"?',
   opts:[{s:'Компонент',c:false},{s:'Директива',c:true},{s:'Пропс',c:false},{s:'Слот',c:false}],
   e:'<strong>Директива</strong> — специальный атрибут Vue. Примеры: <code>v-if</code>, <code>v-for</code>, <code>v-model</code>, <code>v-bind</code> (или <code>:</code>), <code>v-on</code> (или <code>@</code>).'},

  {id:65,t:'vue-basics',
   q:'Как получить значение поля ввода в Vue?',
   opts:[{s:'document.getElementById("inp").value',c:false},{s:'v-model — создаёт двустороннюю привязку',c:true},{s:'@input="e => value = e"',c:false},{s:'ref="inp" и $refs.inp.value',c:false}],
   e:'<code>v-model</code> — двустороннее связывание. Изменил поле → переменная обновилась. Изменилась переменная → поле обновилось. <code>&lt;input v-model="name"&gt;</code> + <code>const name = ref("")</code>.'},

  {id:66,t:'vue-basics',
   q:'Что окажется в поле ввода?',
   code:'const a = ref("Привет")\n// шаблон:\n<input type="text" v-model="a" value="Пока">',
   opts:[{s:'"Пока"',c:false},{s:'"Привет"',c:true},{s:'Поле будет пустым',c:false},{s:'Оба значения',c:false}],
   e:'<code>v-model</code> всегда побеждает статический <code>value</code>. <code>v-model="a"</code> связывает с переменной <code>a = "Привет"</code>. Статический <code>value="Пока"</code> игнорируется. В поле будет <strong>"Привет"</strong>.'},

  {id:67,t:'vue-basics',
   q:'Какие атрибуты используются для условной отрисовки?',
   opts:[{s:'v-visible, v-hidden',c:false},{s:'v-if, v-else-if, v-else и v-show',c:true},{s:'v-condition, v-otherwise',c:false},{s:':if, :else, :show',c:false}],
   e:'• <code>v-if</code> — добавляет/убирает элемент из DOM<br>• <code>v-else-if</code>, <code>v-else</code> — ветви<br>• <code>v-show</code> — элемент остаётся в DOM, скрывается через display:none<br><strong>Разница:</strong> v-if дороже (пересоздаёт), v-show быстрее для частых переключений.'},

  {id:68,t:'vue-basics',
   q:'Главное условие при использовании v-if / v-else-if / v-else?',
   opts:[{s:'Нельзя использовать вместе',c:false},{s:'Должны стоять подряд как соседние элементы без разрывов',c:true},{s:'Нужно указывать :key',c:false},{s:'v-else-if должен идти перед v-if',c:false}],
   e:'Между <code>v-if</code>, <code>v-else-if</code> и <code>v-else</code> не должно быть <strong>никаких других элементов</strong>. Вставишь что-то между — Vue не поймёт что они связаны, <code>v-else</code> сломается.'},

  {id:69,t:'vue-basics',
   q:'Как создать HTML-элементы для каждого элемента списка?',
   opts:[{s:'v-repeat="item in items"',c:false},{s:'v-for="item in items"',c:true},{s:'v-each="item in items"',c:false},{s:'v-loop="item in items"',c:false}],
   e:'<code>v-for</code>: <code>&lt;li v-for="item in items"&gt;{{ item }}&lt;/li&gt;</code>. Если нужен индекс: <code>v-for="(item, index) in items"</code>. Важно добавлять <code>:key="уникальное"</code> для оптимизации Vue.'},

  {id:70,t:'vue-basics',
   q:'Какие три части объекта можно получить в v-for?',
   opts:[{s:'name, value, type',c:false},{s:'value, key, index',c:true},{s:'item, position, total',c:false},{s:'element, id, order',c:false}],
   e:'При переборе объекта: <code>v-for="(value, key, index) in object"</code> — значение, имя свойства, порядковый номер. Массив: <code>v-for="(item, index) in array"</code>.'},

  {id:71,t:'vue-basics',
   q:'С какими типами данных работает v-for?',
   opts:[{s:'Только с массивами',c:false},{s:'Массив, объект, число, строка',c:true},{s:'Только массивы и объекты',c:false},{s:'С любым, но не числом',c:false}],
   e:'<code>v-for</code> перебирает:<br>1. <strong>Массив</strong>: элементы<br>2. <strong>Объект</strong>: свойства (value, key, index)<br>3. <strong>Число</strong>: <code>v-for="n in 5"</code> → 1,2,3,4,5<br>4. <strong>Строку</strong>: посимвольно'},

  // ── VUE COMP ──
  {id:72,t:'vue-comp',
   q:'Как отобразить один компонент внутри другого?',
   opts:[{s:'Написать тег без импорта',c:false},{s:'Импортировать компонент и использовать как тег в шаблоне',c:true},{s:'Вызвать mount() в скрипте',c:false},{s:'Зарегистрировать в store',c:false}],
   e:'1. <code>import MyComponent from "./MyComponent.vue"</code><br>2. <code>&lt;MyComponent /&gt;</code> в шаблоне<br>При <code>&lt;script setup&gt;</code> импортированный компонент доступен сразу, без дополнительной регистрации.'},

  {id:73,t:'vue-comp',
   q:'Как называются два компонента когда один вызван внутри второго?',
   opts:[{s:'Главный и вторичный',c:false},{s:'Родительский (parent) и дочерний (child)',c:true},{s:'Внешний и внутренний',c:false},{s:'Контейнер и содержимое',c:false}],
   e:'Содержит — <strong>родитель (parent)</strong>. Вставлен — <strong>дочерний (child)</strong>. Данные: родитель → ребёнок через <code>props</code>. События: ребёнок → родитель через <code>emit</code>.'},

  {id:74,t:'vue-comp',
   q:'Что используется для передачи данных из родителя в дочерний?',
   opts:[{s:'emit',c:false},{s:'props',c:true},{s:'store',c:false},{s:'provide/inject',c:false}],
   e:'<strong>Props</strong> — данные которые родитель передаёт ребёнку. Как аргументы функции. Однонаправленные: родитель → ребёнок. Изменять пропсы внутри дочернего — плохая практика!'},

  {id:75,t:'vue-comp',
   q:'Два шага для передачи данных из родителя в дочерний',
   opts:[{s:'1) emit 2) подписаться @',c:false},{s:'1) передать :атрибут на теге 2) defineProps в дочернем',c:true},{s:'1) ref 2) provide()',c:false},{s:'1) экспорт 2) импорт',c:false}],
   e:'1. Родитель: <code>&lt;Child :data="myValue" /&gt;</code><br>2. Дочерний: <code>const props = defineProps(["data"])</code> и используем <code>props.data</code>. Двоеточие <code>:</code> означает реактивное значение, не строка.'},

  {id:76,t:'vue-comp',
   q:'Что используется для отправки события из дочернего в родительский?',
   opts:[{s:'props',c:false},{s:'emit + defineEmits',c:true},{s:'store.dispatch()',c:false},{s:'teleport',c:false}],
   e:'<code>emit</code> — генерация пользовательского события. Используется с <code>defineEmits</code>: объявляем события, вызываем <code>emit("имя", данные)</code>. Родитель слушает: <code>@имяСобытия="обработчик"</code>.'},

  {id:77,t:'vue-comp',
   q:'Три шага для передачи данных от дочернего к родителю',
   opts:[{s:'1) defineProps 2) :prop 3) прочитать',c:false},{s:'1) defineEmits 2) emit("event",data) 3) @event в родителе',c:true},{s:'1) store.set 2) store.get 3) watch',c:false},{s:'1) ref 2) provide 3) inject',c:false}],
   e:'1. Дочерний: <code>const emit = defineEmits(["eventName"])</code><br>2. Вызвать: <code>emit("eventName", данные)</code><br>3. Родитель: <code>&lt;Child @event-name="handler" /&gt;</code>'},

  // ── VUE ROUTER ──
  {id:78,t:'vue-router',
   q:'Чем отличаются useRouter() и useRoute()?',
   opts:[{s:'Это одно и то же',c:false},{s:'useRouter — для навигации, useRoute — для чтения текущего маршрута',c:true},{s:'useRouter — Vue 2, useRoute — Vue 3',c:false},{s:'Перепутаны местами',c:false}],
   e:'• <code>useRouter()</code> → <code>router.push("/path")</code>, <code>router.back()</code> — действия, переходы<br>• <code>useRoute()</code> → <code>route.params.id</code>, <code>route.query.page</code> — читаем текущий адрес<br>Аналогия: router — руль, route — GPS.'},

  {id:79,t:'vue-router',
   q:'Какие три поля обязательны при создании маршрута?',
   opts:[{s:'url, title, view',c:false},{s:'path, name, component',c:true},{s:'route, link, page',c:false},{s:'address, id, template',c:false}],
   e:'• <code>path</code>: URL, например <code>"/about"</code><br>• <code>name</code>: имя для навигации через <code>router.push({ name: "about" })</code><br>• <code>component</code>: какой компонент показать<br>Остальное (meta, children) — опционально.'},

  {id:80,t:'vue-router',
   q:'Как сделать один маршрут вложенным в другой?',
   opts:[{s:'Указать полный / путь в дочернем',c:false},{s:'Добавить children в родительский, в компоненте — <router-view>. Путь дочернего без начального /',c:true},{s:'Отдельный router для дочернего',c:false},{s:'v-nest директива',c:false}],
   e:'В роутере: <code>{ path: "/parent", children: [{ path: "child", component: Child }] }</code>. В компоненте родителя: <code>&lt;router-view /&gt;</code>.<br><strong>Нюанс:</strong> путь дочернего <code>"child"</code>, а не <code>"/child"</code> — иначе будет абсолютным!'},

  {id:81,t:'vue-router',
   q:'Как указать динамическую часть маршрута?',
   opts:[{s:'path: "/user/{id}"',c:false},{s:'path: "/user/:id"',c:true},{s:'path: "/user/[id]"',c:false},{s:'path: "/user/$id"',c:false}],
   e:'Двоеточие перед именем — динамический параметр: <code>path: "/user/:id"</code>. Тогда <code>/user/1</code>, <code>/user/42</code>, <code>/user/ivan</code> — все совпадут. Значение через <code>route.params.id</code>.'},

  {id:82,t:'vue-router',
   q:'Как получить динамический параметр маршрута?',
   opts:[{s:'router.params.id',c:false},{s:'useRoute().params.id',c:true},{s:'this.$route.id',c:false},{s:'routeParams("id")',c:false}],
   e:'<code>const route = useRoute()</code>, затем <code>route.params.id</code>. Имя параметра берётся из path (<code>:id</code>). Для query-параметров (<code>?q=hello</code>) — <code>route.query.q</code>.'},

  {id:83,t:'vue-router',
   q:'Какой метод проверяет каждый переход по маршруту?',
   opts:[{s:'router.onNavigate()',c:false},{s:'router.beforeEach((to, from) => {})',c:true},{s:'router.guard()',c:false},{s:'router.check()',c:false}],
   e:'<code>router.beforeEach((to, from) => { ... })</code> — вызывается перед каждым переходом. <code>to</code> — куда, <code>from</code> — откуда. Вернуть false → отменить. Используется для проверки авторизации.'},

  {id:84,t:'vue-router',
   q:'Для чего нужны мета-поля маршрута?',
   opts:[{s:'Для SEO тегов страницы',c:false},{s:'Для произвольных данных маршрута, например ролей доступа',c:true},{s:'Для документации API',c:false},{s:'Устаревший способ передачи props',c:false}],
   e:'<code>meta</code> — объект с любыми данными: <code>{ path: "/admin", meta: { requiresAuth: true, role: "admin" } }</code>. В beforeEach проверяем: <code>if(to.meta.requiresAuth && !isLoggedIn) return "/login"</code>.'},

  // ── VUE COMPOSABLES ──
  {id:85,t:'vue-composables',
   q:'Для чего создаются composables-файлы?',
   opts:[{s:'Для хранения статических данных',c:false},{s:'Для переиспользуемой реактивной логики в разных компонентах',c:true},{s:'Для описания маршрутов',c:false},{s:'Для стилей',c:false}],
   e:'Composable — функция (useЧтоТо), которая содержит реактивную логику. Вместо копипаста одних и тех же ref/функций в разные компоненты — выносишь в один файл и импортируешь. Пример: <code>useCounter</code>, <code>useFetch</code>.'},

  {id:86,t:'vue-composables',
   q:'Что обязательно должно быть в composable?',
   opts:[{s:'Экспортируемый объект с данными',c:false},{s:'Функция use..., создающая реактивные данные и возвращающая их',c:true},{s:'Компонент Vue',c:false},{s:'Вызов defineExpose()',c:false}],
   e:'<code>export function useCounter() {<br>&nbsp;&nbsp;const count = ref(0)<br>&nbsp;&nbsp;function increment() { count.value++ }<br>&nbsp;&nbsp;return { count, increment }<br>}</code><br>Обязательно <strong>return</strong> — иначе компонент ничего не получит!'},

  {id:87,t:'vue-composables',
   q:'Как использовать переменную из composable?',
   opts:[{s:'Она глобальная, просто пишешь имя',c:false},{s:'Импортировать функцию, вызвать, деструктурировать результат',c:true},{s:'inject("composableName")',c:false},{s:'import { count } from "./useCounter"',c:false}],
   e:'<code>import { useCounter } from "./composables/useCounter"</code><br><code>const { count, increment } = useCounter()</code><br>Главное — вызвать функцию со скобками (<code>useCounter()</code>) и забрать нужные значения.'},

  {id:88,t:'vue-composables',
   q:'Как изменить переменную внутри composable из другого компонента?',
   opts:[{s:'Напрямую: count.value = 10',c:false},{s:'Только через функции, которые composable предоставляет',c:true},{s:'Через emit',c:false},{s:'Через store.commit',c:false}],
   e:'Менять данные composable напрямую снаружи — плохая практика (ломает инкапсуляцию). Правильно: composable сам предоставляет функции изменения. Ты вызываешь <code>increment()</code> — он сам меняет <code>count</code>.'},

  {id:90,t:'vue-composables',
   q:'Какая команда создаёт новый Vue-проект?',
   opts:[{s:'vue create my-app',c:false},{s:'npm create vue@latest',c:true},{s:'npx create-vue-app',c:false},{s:'npm init vue',c:false}],
   e:'<code>npm create vue@latest</code> — официальная команда для Vue 3. Запустится мастер: выбери TypeScript, Router, Pinia. После: <code>cd имя</code> → <code>npm install</code> → <code>npm run dev</code>.'},
];

// ═══════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════
let selTopics = new Set(TOPICS.map(t => t.id));
let mode = 'shuffle';
let quiz = [], idx = 0, answered = false, optsRevealed = false;
let res = { correct:[], wrong:[], skipped:[] };
let retryMode = false;

// ═══════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════
(function init() {
  const grid = document.getElementById('topic-grid');
  TOPICS.forEach(t => {
    const cnt = Q.filter(q => q.t === t.id).length;
    const card = document.createElement('div');
    card.className = 'topic-card sel';
    card.dataset.id = t.id;
    card.innerHTML =
      `<div style="display:flex;justify-content:space-between;align-items:flex-start">
        <span class="tc-tag">${cnt} вопросов</span>
        <div class="tc-chk">✓</div>
      </div>
      <div class="tc-name">${t.name}</div>
      <div class="tc-count">${t.desc}</div>`;
    card.onclick = () => toggle(t.id, card);
    grid.appendChild(card);
  });
  updBtn();
})();

function toggle(id, card) {
  selTopics.has(id) ? selTopics.delete(id) : selTopics.add(id);
  card.classList.toggle('sel');
  card.querySelector('.tc-chk').textContent = selTopics.has(id) ? '✓' : '';
  updBtn();
}
function selectAll() {
  TOPICS.forEach(t => selTopics.add(t.id));
  document.querySelectorAll('.topic-card').forEach(c => {
    c.classList.add('sel');
    c.querySelector('.tc-chk').textContent = '✓';
  });
  updBtn();
}
function deselectAll() {
  selTopics.clear();
  document.querySelectorAll('.topic-card').forEach(c => {
    c.classList.remove('sel');
    c.querySelector('.tc-chk').textContent = '';
  });
  updBtn();
}
function setMode(m, btn) {
  mode = m;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
}
function updBtn() {
  document.getElementById('start-btn').disabled = selTopics.size === 0;
}

// ═══════════════════════════════════════════════
//  QUIZ
// ═══════════════════════════════════════════════
function startQuiz() {
  quiz = Q.filter(q => selTopics.has(q.t));
  if (mode === 'shuffle') quiz = shuffle([...quiz]);
  idx = 0;
  res = { correct:[], wrong:[], skipped:[] };
  retryMode = false;
  show('s-quiz');
  renderQ();
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderQ() {
  answered = false;
  optsRevealed = false;
  const q = quiz[idx];
  const total = quiz.length;
  const pct = (idx / total) * 100;

  document.getElementById('q-bar').style.width = pct + '%';
  document.getElementById('q-counter').textContent = (idx + 1) + ' / ' + total;
  const topic = TOPICS.find(t => t.id === q.t);
  document.getElementById('q-topic-label').textContent = topic.name;
  document.getElementById('q-id').textContent = 'Билет #' + q.id;
  document.getElementById('q-text').textContent = q.q;

  const codeEl = document.getElementById('q-code');
  if (q.code) {
    codeEl.style.display = 'block';
    codeEl.className = 'q-code';
    codeEl.textContent = q.code;
  } else {
    codeEl.style.display = 'none';
  }

  const optsEl = document.getElementById('q-opts');
  optsEl.innerHTML = '';
  const shuffled = shuffle([...q.opts]);
  const letters = ['А','Б','В','Г'];
  shuffled.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.innerHTML = '<span class="opt-l">' + letters[i] + '</span>' + esc(o.s);
    btn.onclick = () => pick(btn, o.c, q, shuffled);
    optsEl.appendChild(btn);
  });

  // show blur overlay
  const overlay = document.getElementById('blur-overlay');
  overlay.classList.remove('hidden');

  document.getElementById('q-explain').classList.remove('on');
  document.getElementById('exp-body').innerHTML = '';
  document.getElementById('btn-next').style.display = 'none';
  document.getElementById('btn-skip').style.display = 'inline-block';
}

function revealOpts() {
  optsRevealed = true;
  document.getElementById('blur-overlay').classList.add('hidden');
}

function pick(btn, isCorrect, q, opts) {
  if (answered) return;
  if (!optsRevealed) return; // must reveal first
  answered = true;

  document.getElementById('blur-overlay').classList.add('hidden');

  document.querySelectorAll('.opt').forEach((b, i) => {
    b.disabled = true;
    if (opts[i].c) b.classList.add('correct');
  });

  if (isCorrect) {
    btn.classList.add('correct');
    res.correct.push(q);
  } else {
    btn.classList.add('wrong');
    res.wrong.push(q);
  }

  document.getElementById('exp-body').innerHTML = q.e;
  document.getElementById('q-explain').classList.add('on');
  document.getElementById('btn-next').style.display = 'inline-block';
  document.getElementById('btn-skip').style.display = 'none';
}

function skipQ() {
  if (answered) return;
  answered = true;
  optsRevealed = true;
  document.getElementById('blur-overlay').classList.add('hidden');
  const q = quiz[idx];
  res.skipped.push(q);

  const opts = Array.from(document.querySelectorAll('.opt'));
  // find which button is correct by checking q.opts
  const shuffledOpts = [];
  opts.forEach((b, i) => {
    b.disabled = true;
    const text = b.textContent.trim().slice(1).trim();
    const match = q.opts.find(o => o.s === text);
    if (match && match.c) b.classList.add('reveal');
  });

  document.getElementById('exp-body').innerHTML = q.e;
  document.getElementById('q-explain').classList.add('on');
  document.getElementById('btn-next').style.display = 'inline-block';
  document.getElementById('btn-skip').style.display = 'none';
}

function nextQ() {
  idx++;
  if (idx >= quiz.length) showRes();
  else renderQ();
}

// ═══════════════════════════════════════════════
//  RESULTS
// ═══════════════════════════════════════════════
function showRes() {
  show('s-res');
  const total = quiz.length;
  const cor = res.correct.length;
  const wrg = res.wrong.length;
  const skp = res.skipped.length;
  const pct = Math.round((cor / total) * 100);

  let emoji, title, sub;
  if (pct >= 90) { emoji='🏆'; title='Отлично!'; sub='Готов к экзамену'; }
  else if (pct >= 70) { emoji='👍'; title='Хороший результат!'; sub='Ещё чуть-чуть — и идеально'; }
  else if (pct >= 50) { emoji='📚'; title='Неплохо, но есть над чем работать'; sub='Разбери ошибки ниже'; }
  else { emoji='💪'; title='Нужно ещё повторить'; sub='Не сдавайся — разбери ошибки и попробуй снова'; }

  document.getElementById('r-emoji').textContent = emoji;
  document.getElementById('r-title').textContent = title;
  document.getElementById('r-sub').textContent = sub;
  document.getElementById('r-pct').textContent = pct + '%';
  document.getElementById('r-correct').textContent = cor;
  document.getElementById('r-wrong').textContent = wrg;
  document.getElementById('r-skip').textContent = skp;

  // ring animation
  const C = 339.3;
  const offset = C - (pct / 100) * C;
  const circle = document.getElementById('r-circle');
  circle.style.strokeDashoffset = C;
  circle.style.stroke = pct >= 70 ? '#3ecfb2' : pct >= 50 ? '#ffba2e' : '#ff5e6d';
  circle.style.transition = 'none';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      circle.style.transition = 'stroke-dashoffset 1s ease';
      circle.style.strokeDashoffset = offset;
    });
  });

  // topic progress
  const topicsInQuiz = [...new Set(quiz.map(q => q.t))];
  const tpList = document.getElementById('topic-progress-list');
  tpList.innerHTML = '';
  topicsInQuiz.forEach(tid => {
    const topicQ = quiz.filter(q => q.t === tid);
    const topicCorrect = res.correct.filter(q => q.t === tid).length;
    const topicWrong = res.wrong.filter(q => q.t === tid).length;
    const topicSkipped = res.skipped.filter(q => q.t === tid).length;
    const topicTotal = topicQ.length;
    const topicPct = Math.round((topicCorrect / topicTotal) * 100);
    const topic = TOPICS.find(t => t.id === tid);
    const barColor = topicPct >= 70 ? 'var(--green)' : topicPct >= 40 ? 'var(--yellow)' : 'var(--red)';
    const item = document.createElement('div');
    item.className = 'tp-item';
    item.innerHTML =
      '<div class="tp-header">' +
        '<span class="tp-name">' + topic.name + '</span>' +
        '<span class="tp-stat">' + topicCorrect + '/' + topicTotal + ' · ' + topicPct + '%</span>' +
      '</div>' +
      '<div class="tp-bar-bg"><div class="tp-bar" style="width:0%;background:' + barColor + '" data-w="' + topicPct + '"></div></div>';
    tpList.appendChild(item);
  });
  // animate bars
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      tpList.querySelectorAll('.tp-bar').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    });
  });

  // retry wrong button
  const toRetry = [...res.wrong, ...res.skipped];
  const retryBtn = document.getElementById('btn-retry-wrong');
  retryBtn.style.display = toRetry.length > 0 ? 'inline-block' : 'none';

  // repeat list
  const toRepeat = [...res.wrong, ...res.skipped];
  document.getElementById('rep-badge').textContent = toRepeat.length;

  const list = document.getElementById('rep-list');
  list.innerHTML = '';

  if (toRepeat.length === 0) {
    document.getElementById('rep-section').style.display = 'none';
  } else {
    document.getElementById('rep-section').style.display = 'block';
    toRepeat.forEach(q => {
      const topic = TOPICS.find(t => t.id === q.t);
      const correct = q.opts.find(o => o.c);
      const item = document.createElement('div');
      item.className = 'rep-item';
      item.innerHTML =
        '<div class="rep-tag">Билет #' + q.id + ' · ' + topic.name + '</div>' +
        '<div class="rep-q">' + esc(q.q) + '</div>' +
        '<div class="rep-ans">✅ <strong>Правильно:</strong> ' + esc(correct.s) + '<br><br>💡 ' + q.e + '</div>';
      list.appendChild(item);
    });
  }
}

function retryWrong() {
  const toRetry = [...res.wrong, ...res.skipped];
  if (toRetry.length === 0) return;
  quiz = shuffle([...toRetry]);
  idx = 0;
  res = { correct:[], wrong:[], skipped:[] };
  retryMode = true;
  show('s-quiz');
  renderQ();
}

function goMenu() { show('s-menu'); }

// ═══════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));
  document.getElementById(id).classList.add('on');
}
function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}