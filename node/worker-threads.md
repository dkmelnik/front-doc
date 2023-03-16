Node.js использует два вида потоков:

- основной поток, обрабатываемый циклом событий (Event Loop),
несколько вспомогательных потоков в пуле воркеров.
Цикл обработки событий — это механизм, который принимает callback-функции
и регистрирует их для выполнения в определённый момент в будущем. 
Он работает в том же потоке, что и сам код JavaScript.
Когда операция блокирует поток, цикл событий также блокируется.

- Пул воркеров — модель исполнения, 
вызывающая и обрабатывающая отдельные потоки.
Затем они синхронно выполняют задачу и 
возвращают результат в цикл обработки событий. 
После цикл вызывает callback-функцию с указанным результатом.

Если коротко, то пул воркеров может заниматься асинхронными
операциями ввода-вывода — прежде всего, взаимодействем 
с системным диском и сетью. Эта модель исполнения в основном
используется модулями вроде fs (требовательного к скорости ввода-вывода)
или crypto (требовательного к CPU). Пул воркеров реализован 
в libuv, что приводит к небольшой задержке всякий раз, 
когда Node требует связи между JavaScript и C ++, 
но эта задержка едва ощутима.