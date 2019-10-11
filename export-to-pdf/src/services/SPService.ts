import { sp } from "@pnp/sp";

/**
 * Returns the item by its Id from the specified list.
 * @param listTitle Title of the list.
 * @param itemId Id of the item.
 */
export function getItem<T>(listTitle: string, itemId: string): Promise<T> {
  return new Promise((resolve, reject) => {
    sp.web.lists.getByTitle(listTitle).items.getById(parseInt(itemId)).get<T>()
      .then((item: T) => { resolve(item); })
      .catch((error) => { reject(error); });
  });
}

/**
 * Returns the list of items by their ids from the specified list.
 * If the list of ids is empty, returns all the items.
 * @param listTitle Title of the list.
 * @param itemIdList List of ids of items to retrieve.
 */
export function getItems<T>(listTitle: string, itemIdList: string[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const filterByIds = itemIdList.map(id => `Id eq ${id}`).join(' or ');
    sp.web.lists.getByTitle(listTitle).items.filter(filterByIds).get<T[]>()
      .then((items: T[]) => { resolve(items); })
      .catch((error) => { reject(error); });
  });
}

/**
 * Returns the entiry storage value by its key.
 * @param key Key.
 */
export function getStorageEntityValue(key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    sp.web.getStorageEntity(key).then((storageEntity) => {
      resolve(storageEntity.Value);
    });
  });
}
