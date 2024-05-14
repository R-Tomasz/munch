const initialData = {
    'column-1': {
        id: 'column-1',
        username: '',
        areas: {
            'column-1-revealed': {
                id: 'column-1-revealed',
                itemIds: [],
            },
            'column-1-hidden': {
                id: 'column-1-hidden',
                itemIds: [],
            }
        },
    },
    'column-2': {
        id: 'column-2',
        username: '',
        areas: {
            'column-2-revealed': {
                id: 'column-2-revealed',
                itemIds: [],
            },
            'column-2-hidden': {
                id: 'column-2-hidden',
                itemIds: [],
            }
        },
    },
    'column-3': {
        id: 'column-3',
        username: '',
        areas: {
            'column-3-revealed': {
                id: 'column-3-revealed',
                itemIds: [],
            },
            'column-3-hidden': {
                id: 'column-3-hidden',
                itemIds: [],
            }
        },
    },
    'column-4': {
        id: 'column-4',
        username: '',
        areas: {
            'column-4-revealed': {
                id: 'column-4-revealed',
                itemIds: [],
            },
            'column-4-hidden': {
                id: 'column-4-hidden',
                itemIds: [],
            }
        },
    },
    'stolik': {
        id: 'stolik',
        areas: {
            'stack-doors': {
                id: 'stack-doors',
                itemIds: [],
                stack: true,
                hidden: true
            },
            'stack-treasures': {
                id: 'stack-treasures',
                itemIds: [],
                stack: true,
                hidden: true
            },
            'stack-discarded-doors': {
                id: 'stack-discarded-doors',
                itemIds: [],
                stack: true,
                hidden: false
            },
            'stack-discarded-treasures': {
                id: 'stack-discarded-treasures',
                itemIds: [],
                stack: true,
                hidden: false
            },
            'playing-area': {
                id: 'playing-area',
                itemIds: [],
                stack: false,
                hidden: false
            }
        }
    }
}

export default initialData;