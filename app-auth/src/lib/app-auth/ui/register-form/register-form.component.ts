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
import { Register } from "../../utils";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        MultitabComponent,
        TextboxComponent,
        PrimaryButtonComponent,
        ReactiveFormsModule,
    ],
    selector: "auth-register-form",
    templateUrl: "./register-form.component.html",
    styleUrls: ["./register-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit {
    private readonly fb: FormBuilder = inject(FormBuilder);

    @Input() usernameFieldName?: string;
    @Input() usernameFieldPlaceholder?: string;
    @Input() emailFieldName?: string;
    @Input() emailFieldPlaceholder?: string;
    @Input() passwordFieldName?: string;
    @Input() passwordFieldPlaceholder?: string;
    @Input() validationPattern: string = "";

    @Output() formSubmit: EventEmitter<Register> = new EventEmitter<Register>();

    readonly form = this.fb.group({
        username: this.fb.control<string | null>("", [Validators.required]),
        email: this.fb.control<string | null>("", [
            Validators.required,
            Validators.email,
        ]),
        password: this.fb.control<string | null>("", [Validators.required]),
    });

    ngOnInit() {
        this.form.controls.password.addValidators([
            Validators.pattern(this.validationPattern),
        ]);
    }

    submitForm() {
        if (
            this.form.valid &&
            this.form.controls.username.value &&
            this.form.controls.email.value &&
            this.form.controls.password.value
        ) {
            this.formSubmit.emit({
                username: this.form.controls.username.value,
                email: this.form.controls.email.value,
                password: this.form.controls.password.value,
            });
        }
    }
}
