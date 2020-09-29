export class Place {

    constructor(public name: string,
                public phoneNumber: string,
                public vicinity: string,
                public isOpen: boolean,
                public rating: number,
                public workingHours: [],
                public imgUrl: string,
                public webpageUrl: string,
                public location: {lat: number, lng: number}) {}
                
}