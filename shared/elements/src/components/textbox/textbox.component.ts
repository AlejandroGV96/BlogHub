import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    inject,
} from "@angular/core";
import { ValueAccessorDirective } from "../..";
import { take } from "rxjs";

@Component({
    selector: "agv-textbox",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./textbox.component.html",
    styleUrls: ["./textbox.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ValueAccessorDirective],
})
export class TextboxComponent implements OnInit {
    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
    private valueAccessor: ValueAccessorDirective<string> = inject(
        ValueAccessorDirective<string>,
    );

    public value?: string;

    @Input() label?: string;
    @Input() placeholder?: string = "Enter text here...";
    @Input() type: "text" | "password" = "text";
    @Input() maxLength?: number = 40;
    @Input() disabled?: boolean;
    @Input() invalid?: boolean;

    touched: boolean = false;

    constructor() {
        this.valueAccessor.value.subscribe((v) => {
            this.value = v;
            this.cdr.detectChanges();
        });

        this.valueAccessor.disabled.subscribe((v) => {
            this.disabled = v;
            this.cdr.detectChanges();
        });
    }

    ngOnInit(): void {
        this.valueAccessor.value.pipe(take(1)).subscribe((v) => {
            if (v) {
                this.touched = true;
            }
        });
    }

    valueChange(value: string) {
        this.valueAccessor.valueChange(value);
        this.valueAccessor.touchedChange(true);
        this.touched = true;
        this.cdr.detectChanges();
    }
}
