export interface ContactFormElements extends HTMLFormControlsCollection {
    name: {
        value: string
    },
    email: {
        value: string
    },
    phoneNumber: {
        value: string
    },
    location: {
        value: string
    },
    message: {
        value: string
    }
}

export interface BookingFormElements extends HTMLFormControlsCollection {
    name: {
        value: string
    },
    email: {
        value: string
    },
    phoneNumber: {
        value: string
    },
    location: {
        value: string
    },
    date: {
        value: string
    },
    time: {
        value: string
    },
    message: {
        value: string
    }
}

export interface OrderFormElements extends HTMLFormControlsCollection {
    firstName: {
        value: string
    },
    lastName: {
        value: string
    },
    phoneNumber: {
        value: string
    },
    email: {
        value: string
    },
    country: {
        value: string
    },
    addressLine1: {
        value: string
    },
    addressLine2: {
        value: string
    },
    orderNotes: {
        value: string
    }
}

export interface CouponFormElements extends HTMLFormControlsCollection {
    coupon: {
        value: string
    }
}

export interface ReviewFormElements extends HTMLFormControlsCollection {
    name: {
        value: string
    },
    email: {
        value: string
    },
    message: {
        value: string
    },

}