import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MarkdownPreviewComponent } from "../ui/markdown-preview.component";
import {
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    TextboxComponent,
} from "@web-app/shared/elements";
import { Subject, debounceTime, first, takeUntil } from "rxjs";
import { EditorStore } from "../data-access/editor.store";
import { CreatePost } from "@web-app/shared/api";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TextboxComponent,
        MarkdownPreviewComponent,
        PrimaryButtonComponent,
        SecondaryButtonComponent,
        ReactiveFormsModule,
    ],
    templateUrl: "./app-editor.component.html",
    styleUrls: ["./app-editor.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppEditorComponent implements OnInit, OnDestroy {
    private readonly fb = inject(FormBuilder).nonNullable;
    private readonly editorStore = inject(EditorStore);
    private readonly unsuscribe$ = new Subject<void>();

    readonly createPostForm = this.fb.group({
        title: this.fb.control<string>("", Validators.required),
        description: this.fb.control<string>("", Validators.required),
        content: this.fb.control<string>("", Validators.required),
    });

    readonly style: string = `
        padding: 0 8px;
        font-size: 12px;
        text-transform: none;
    `;

    preview = true;

    ngOnInit(): void {
        this.editorStore.selectCurrentPost$.pipe(first()).subscribe((post) => {
            if (post) {
                this.createPostForm.patchValue(post);
            }
        });

        this.createPostForm.valueChanges
            .pipe(takeUntil(this.unsuscribe$), debounceTime(500))
            .subscribe((value) => {
                this.editorStore.updateCurrentPost(value as CreatePost);
            });
    }

    ngOnDestroy(): void {
        this.unsuscribe$.next();
        this.unsuscribe$.complete();
    }

    submitPost() {
        this.editorStore.createPost(this.createPostForm.value as CreatePost);
    }
}
