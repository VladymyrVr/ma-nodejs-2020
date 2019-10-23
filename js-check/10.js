class Storage {
    constructor() {
        this.storage = {};
    }

    list() {
        return Promise.resolve(Object.keys(this.storage));
    }

    fetch(key) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const res = this.storage[key];
                res ? resolve(res) : reject('Not found');
            }, 1000)
        })
    }

    store(key, data) {
        this.storage[key] = data;
        return Promise.resolve();
    }

    destroy(key) {
        delete this.storage[key];
        return Promise.resolve();
    }

    storeList(list) {
        list.forEach(({key, data}) => this.store(key, data));

        return Promise.resolve();
    }

    destroyStartedWith(beginningOfKey) {
        if(!beginningOfKey) return Promise.resolve();

        return this.list()
            .then(keysList => {
                const mask = new RegExp(`^${beginningOfKey}`);

                const keysForDeleting = keysList.filter(key => mask.test(key));
                keysForDeleting.forEach(deletingKey => this.destroy(deletingKey));

                return Promise.resolve()
            })
    }

    fetchInTimeOrFail(key, timeout) {
        return new Promise((resolve, reject) => {
            this.fetch(key).then(resolve);
            setTimeout(() => reject('Item with this key not found'), timeout)
        })
    }
}

//--------------------------CREATING--------------------------//
const storage = new Storage();

//------------------------ADDING_ITEMS------------------------//
storage.store('Chrome', 'Google')
    .then();
storage.store('Mozilla Firefox', 'Mozilla Foundation')
    .then();
storage.store('Safari', 'Apple')
    .then();

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
