import { atom } from 'recoil';

export const historyState = atom({
    key: 'historyKey',
    default: [
        {
            id: 0,
            latitude: 42.123456,
            longitude: 12.123456,
            distance: 100,
            from: '2020-01-01',
            to: '2020-01-02',
        },
        {
            id: 1,
            latitude: 40.987654,
            longitude: -110.321654,
            distance: 10,
            from: '2020-01-01',
            to: '2020-01-02',
        },
    ]
});

export const queryState = atom({
    key: 'queryKey',
    default: {
        latitude: 42.123456,
        longitude: -90.123456,
        distance: 100,
        from: '2020-01-01 00:00:00',
        to: '2020-01-02 00:00:00',
    }
});