declare namespace Baum3 {
    let dropdown: number;
    let textInput: number;
    let config: Configuration;
    interface Configuration {
        groups: Group[];
        deliveryTypes: DeliveryType[];
    }
    interface DeliveryType {
        name: string;
        price: number;
    }
    interface Group {
        name: string;
        type: number;
        articles: Article[];
    }
    interface Article {
        name: string;
        price: number;
    }
}
