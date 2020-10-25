export class Place {

    constructor(public id: string,
                public name: string,
                public address: string,
                public location: {lat: number, lng: number},
                public imgUrl: string,
                public workingHours: [],
                public isOpen: boolean,
                public webpageUrl: string,
                public phoneNumber: string,
                public rating: number) {}
                
}