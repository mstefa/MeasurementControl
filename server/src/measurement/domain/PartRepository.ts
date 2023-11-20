import { Part } from "./Part";

export interface PartRepository {

  search(name: string): Part;

}
