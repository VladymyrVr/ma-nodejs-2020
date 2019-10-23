function Storage(maxCalls = 5) {
    let privateStore = {};
    let calls = 0;
    const queIO = [];

    const getItem = (key) => new Promise(res => {
        calls++;
        if (calls <= maxCalls) {
            setTimeout(() => {
                calls--;
                res(
                    key ? privateStore[key] : { ...privateStore }
                );

                const next = queIO.shift();
                next && next()
            }, 1000)
        } else {
            calls--;
            queIO.push(() => res(getItem(key)))
        }
    });

    const setItem = (key, value) => new Promise(res => {
        calls++;
        if (calls <= maxCalls) {
            setTimeout(() => {
                calls--;
                if (key) {
                    res(privateStore[key] = value)
                } else {
                    res(privateStore = value)
                }
                const next = queIO.shift();
                next && next()
            }, 1000)
        } else {
            calls--;
            queIO.push(() => res(setItem(key, value)))
        }
    });


    const list = () => getItem().then(Object.keys);
    const fetch = (key) => key ? getItem(key) : Promise.reject('no key');
    const store = (key, value) => key ? setItem(key, value) : Promise.reject('no key');
    const destroy = (key) => {
        if (!key) return Promise.reject('no key');

        return getItem().then(storageCopy => {
                const del = k => delete storageCopy[k];

                Array.isArray(key) ? key.forEach(del) : del(key);

                return setItem(null, storageCopy)
            }
        )};

    const storeList = list => getItem().then(
        storageCopy => {
            for (let { key, data } of list) {
                if (key) storageCopy[key] = data
            }

            return setItem(null, storageCopy)
        }
    );


    const destroyStartedWith = (beginningOfKey) => {
        if (!beginningOfKey) return Promise.resolve();

        return list()
            .then(keysList => {
                const mask = new RegExp(`^${beginningOfKey}`);
                const keysForDeleting = keysList.filter(key => mask.test(key));
                return destroy(keysForDeleting).then(() => Promise.resolve())
            })
    };

    const fetchInTimeOrFail = (key, timeout) => {
        return new Promise((resolve, reject) => {
            fetch(key).then(resolve);
            setTimeout(() => reject('Item with this key not found'), timeout)
        })
    };

    return {
        list,
        fetch,
        store,
        destroy,
        storeList,
        destroyStartedWith,
        fetchInTimeOrFail
    }
}

//--------------------------CREATING--------------------------//
const storage = new Storage(5);

//------------------------ADDING_ITEMS------------------------//
storage.store('Chrome', 'Google')
    .then();
storage.store('Mozilla Firefox', 'Mozilla Foundation')
    .then();
storage.store('Safari', 'Apple')
    .then();
storage.store('Yandex Browser', 'Yandex')
    .then();
storage.store('12', '12')
    .then();
storage.store('34', '34')
    .then();

storage.list().then(list => console.log(list));

//--------------------------FETCHING--------------------------//
storage.fetch('Safari').then((res) => console.log(`fetch  ->   ${res}`));

storage.fetchInTimeOrFail('Chrome', 500)
    .then((res) => console.log(`fetchInTimeOrFail  ->   ${res}`))
    .catch((err) => console.log(`fetchInTimeOrFail  ->  ${err}`));

//------------------------MULTI_ADDING------------------------//
const list = [{ key: 'IE', data: 'Microsoft' }, { key: 'Opera', data: 'Opera Software' }];

storage.storeList(list)
    .then(() => storage.list())
    .then(list => console.log(list));

//-------------------DESTROY_BY_PART_OF_KEY------------------//
storage.destroyStartedWith('I')
    .then(() => storage.list())
    .then(list => console.log(list))
    .catch(error => console.log(error));
