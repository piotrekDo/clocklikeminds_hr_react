import { OccasionalLeaveType } from "./Pto";
import { Setting } from "./Setting";

export interface MetaData {
    requestTypes: string[];
    occasionalLeaveTypes: OccasionalLeaveType[];
    settings: Setting[];
}
