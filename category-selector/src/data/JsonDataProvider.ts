import { IDataProvider } from "./IDataProvider";
import { IContentSection, IContent } from "./IContent";
import { ICategory } from "./ICategory";

/**
 * Describes the Group. The group has got a name, key, url and other properties.
 * Additionally it may have a set of sub-groups and a related content.
 */
interface IGroup {
  name: string;
  key: string;
  url: string;
  icon?: string;
  description?: string;

  groups?: IGroup[];
  content?: IContentSection[];
}

/**
 * Collection of groups.
 */
interface IGroupData {
  groups: IGroup[];
}

/**
 * Data provider that maintains its configuration in Json.
 */
export default class JsonDataProvider implements IDataProvider {
  /**
   * Stores all groups data for the provider.
   */
  private groupsData: IGroupData;

  /**
   *
   * @param jsonCategories Json that contain the configuration of the data provider.
   */
  constructor(jsonCategories: string) {
    this.groupsData = { groups: [] };

    if (jsonCategories !== '') {
      try {
        this.groupsData = JSON.parse(jsonCategories);
      } catch (error) {
        console.log(error);
      }
    }
  }

  /**
   * Gets the list of categories by the specific path.
   *
   * @param path Path.
   */
  public getByPath(path: ICategory[]): Promise<ICategory[]> {
    return this.getByKeys(path.map((category) => category.key));
  }

  /**
   * Gets the list of root-level categories.
   */
  public getRoot(): Promise<ICategory[]> {
    return this.getByPath([]);
  }

  /**
   * Gets a list of categories by their keys.
   *
   * @param keys List of keys.
   */
  public getCategoriesByKeys(keys: string[]): Promise<ICategory[]> {
    return new Promise((resolve, reject) => {
      if (keys.length === 0) {
        resolve([]);
      }

      const categories: ICategory[] = [];
      let data = this.groupsData.groups;

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        for (let j = 0; j < data.length; j++) {
          const group = data[j];

          if (group.key === key) {
            categories.push(group);
            data = group.groups;

            break;
          }
        }
      }

      resolve(categories.map(this.toCategory));
    });
  }

  /**
   * Gets the content for the speficied path.
   *
   * @param path Path.
   */
  public getContent(path: ICategory[]): Promise<IContent | undefined> {
    return new Promise((resolve, reject) => {
      let content = undefined;
      const selectedGroup = this.getSelectedGroup(path);

      if (selectedGroup !== undefined && selectedGroup.content !== undefined && selectedGroup.content.length !== 0) {
        resolve({
          name: selectedGroup.content[0].name,
          sections: selectedGroup.content,
        });
      }

      resolve(content);
    });
  }

  /**
   * Returns a list of categories by their keys.
   *
   * @param keys List of keys.
   */
  private getByKeys(keys: string[]): Promise<ICategory[]> {
    return new Promise<ICategory[]>((resolve, reject) => {

      if (keys.length === 0) {
        resolve(this.groupsData.groups.map(this.toCategory));
      } else {
        let data = this.groupsData.groups;

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];

          for (let j = 0; j < data.length; j++) {
            const group = data[j];

            if (group.key === key) {
              data = group.groups;

              if (data === undefined) {
                resolve([]);
              }

              break;
            }
          }
        }

        resolve(data.map(this.toCategory));
      }
    });
  }

  /**
   * Maps properties of the IGroup object to ICategory.
   *
   * @param group Group.
   */
  private toCategory(group: IGroup): ICategory {
    const { key, name, url, icon, description } = group;

    return { key, name, url, icon, description };
  }

  /**
   * Returns the group by the path.
   *
   * @param path Path.
   */
  private getSelectedGroup(path: ICategory[]): IGroup | undefined {
    let selectedGroup = undefined;

    if (path.length === 0) {
      return selectedGroup;
    }

    let groups = this.groupsData.groups;

    for (let i = 0; i < path.length; i++) {
      const selectedCategory = path[i];

      if (groups !== undefined) {
        for (let j = 0; j < groups.length; j++) {
          const group = groups[j];

          if (selectedCategory.key === group.key) {
            selectedGroup = group;
            groups = group.groups;
            break;
          }
        }
      } else {
        // cannot find the group with the specified path
        return undefined;
      }
    }

    return selectedGroup;
  }
}
