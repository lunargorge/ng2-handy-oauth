export interface FoursquareUserinfoResponseInterface {
    response: {
        user: {
            id: string,
            firstName: string,
            lastName: string,
            gender: string,
            photo: {
                prefix: string,
                suffix: string
            },
            birthday: number,
            contact: {
                email: string
            }
        }
    };
}
