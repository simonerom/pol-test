import { atom } from 'recoil';

export const historyState = atom({
    key: 'historyKey',
    default: [
        {
            id: 0,
            latitude: 42,
            longitude: 12,
            distance: 100,
            from: '2020-01-01',
            to: '2020-01-02',
        },
        {
            id: 1,
            latitude: 40.9,
            longitude: 14.3,
            distance: 10,
            from: '2020-01-01',
            to: '2020-01-02',
        },
    ]
});

export const queryState = atom({
    key: 'queryKey',
    default: {
        latitude: 42,
        longitude: 12,
        distance: 100,
        from: '2020-01-01',
        to: '2020-01-02',
    }
});