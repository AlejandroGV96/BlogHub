import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    inject,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RegisterRequest } from "@web-app/shared/api";
import {
    MultitabComponent,
    PrimaryButtonComponent,
    TextboxComponent,
} from "@web-app/shared/elements";
import { Subscription } from "rxjs";

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
export class RegisterFormComponent implements OnInit, OnDestroy {
    private readonly fb: FormBuilder = inject(FormBuilder);

    private readonly subscriptions: Subscription[] = [];

    @Input() usernameFieldName?: string;
    @Input() usernameFieldPlaceholder?: string;
    @Input() emailFieldName?: string;
    @Input() emailFieldPlaceholder?: string;
    @Input() passwordFieldName?: string;
    @Input() passwordFieldPlaceholder?: string;
    @Input() validationPattern: string = "";

    @Input() initialValues?: RegisterRequest;

    @Output() formSubmit = new EventEmitter<RegisterRequest>();

    @Output() formChange = new EventEmitter<RegisterRequest>();

    readonly form = this.fb.group({
        username: this.fb.control<string | null>("", [Validators.required]),
        email: this.fb.control<string | null>("", [
            Validators.required,
            Validators.email,
        ]),
        password: this.fb.control<string | null>("", [Validators.required]),
    });

    ngOnInit() {
        if (
            this.initialValues?.username ||
            this.initialValues?.email ||
            this.initialValues?.password
        ) {
            if (this.initialValues.username) {
                this.form.controls.username.setValue(
                    this.initialValues.username,
                );
                this.form.controls.username.markAsTouched();
            }
            if (this.initialValues.email) {
                this.form.controls.email.setValue(this.initialValues.email);
                this.form.controls.email.markAsTouched();
            }
            if (this.initialValues.password) {
                this.form.controls.password.setValue(
                    this.initialValues.password,
                );
                this.form.controls.password.markAsTouched();
            }
        }
        this.form.controls.password.addValidators([
            Validators.pattern(this.validationPattern),
        ]);

        this.subscriptions.push(
            this.form.valueChanges.subscribe(() => this.onFormChange()),
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    onFormChange() {
        this.formChange.emit({
            email: this.form.controls.email.value ?? "",
            password: this.form.controls.password.value ?? "",
            username: this.form.controls.username.value ?? "",
        });
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
