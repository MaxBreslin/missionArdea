export class Helper {
    public static createEvent(name, detail) {
        const customEvent = new CustomEvent(name, {
            detail: detail
        });
        return customEvent;
    }
}
