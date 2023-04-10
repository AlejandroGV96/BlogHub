import { NgClass, NgFor } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";

@Component({
    selector: "agv-multitab",
    standalone: true,
    imports: [NgFor, NgClass],
    templateUrl: "./multitab.component.html",
    styleUrls: ["./multitab.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultitabComponent {
    @Input() tabs: string[] = [];
    @Input() selectedTab: number = 0;

    @Output() selectedTabChange = new EventEmitter<number>();

    selectTab(index: number) {
        this.selectedTab = index;
        this.selectedTabChange.emit(index);
    }
}
