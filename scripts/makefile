TARGET=main.js
TC=tsc
FLAGS= --target es6 --module AMD --outFile $(TARGET)

build: $(TARGET)

$(TARGET): main.ts game.ts terminal.ts helper.ts
	$(TC) $(FLAGS) main.ts game.ts terminal.ts helper.ts

clean:
	rm $(TARGET)