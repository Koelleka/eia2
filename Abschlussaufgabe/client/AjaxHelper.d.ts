declare namespace UnoClient {
    class AjaxHelper {
        static sendCommand(_command: Command): void;
        private static sendRequestWithCustomData(_command);
        private static handleStateChange(_event);
    }
}
