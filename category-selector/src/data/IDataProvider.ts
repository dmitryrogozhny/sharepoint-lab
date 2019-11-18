import { ICategory } from "./ICategory";
import { IContent } from "./IContent";

/**
 * Interface for a data provider.
 */
export interface IDataProvider {
  /**
   * Gets the list of root-level categories.
   */
  getRoot(): Promise<ICategory[]>;
  /**
   * Gets the list of categories by the specific path.
   *
   * @param path Path.
   */
  getByPath(path: ICategory[]): Promise<ICategory[]>;
  /**
   * Gets a list of categories by their keys.
   *
   * @param keys List of keys.
   */
  getCategoriesByKeys(keys: string[]): Promise<ICategory[]>;
  /**
   * Gets the content for the speficied path.
   *
   * @param path Path.
   */
  getContent(path: ICategory[]): Promise<IContent | undefined>;
}
