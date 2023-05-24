import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "agv-primary-button",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./primary-button.component.html",
    styleUrls: ["./primary-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent {
    @Input() name: string = "Default";
    @Input() disabled: boolean = false;
    @Input() customStyle: string = "";

    @Output() press: EventEmitter<void> = new EventEmitter<void>();

    buttonPressed(): void {
        this.press.emit();
    }
}
