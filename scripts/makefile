TARGET=main.js
TC=tsc
FLAGS= --target es6 --module AMD --outFile $(TARGET)

build: $(TARGET)

$(TARGET): main.ts game.ts terminal.ts broadcaster.ts
	$(TC) $(FLAGS) main.ts game.ts terminal.ts broadcaster.ts

clean:
	rm $(TARGET)