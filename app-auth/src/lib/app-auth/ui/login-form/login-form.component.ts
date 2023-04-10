import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    inject,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {
    MultitabComponent,
    PrimaryButtonComponent,
    TextboxComponent,
} from "@web-app/shared/elements";
import { Login } from "../../utils";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        MultitabComponent,
        TextboxComponent,
        PrimaryButtonComponent,
        ReactiveFormsModule,
    ],
    selector: "auth-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
    private readonly fb: FormBuilder = inject(FormBuilder);

    @Input() loginEmailFieldName?: string;
    @Input() loginEmailFieldPlaceholder?: string;
    @Input() loginPasswordFieldName?: string;
    @Input() loginPasswordFieldPlaceholder?: string;
    @Input() validationPattern: string = "";

    @Output() formSubmit: EventEmitter<Login> = new EventEmitter<Login>();

    readonly form = this.fb.group({
        main: this.fb.control<string | null>("", [
            Validators.required,
            Validators.email,
        ]),
        secondary: this.fb.control<string | null>("", [Validators.required]),
    });

    ngOnInit() {
        this.form.controls.secondary.addValidators([
            Validators.pattern(this.validationPattern),
        ]);
    }

    submitForm() {
        if (
            this.form.valid &&
            this.form.controls.main.value &&
            this.form.controls.secondary.value
        ) {
            this.formSubmit.emit({
                email: this.form.controls.main.value,
                password: this.form.controls.secondary.value,
            });
        }
    }
}
