import { ChangeDetectorRef, ElementRef, Injector } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { InputEditorComponent } from './input-editor.component';

describe('InputEditorComponent - issue 2483', () => {
    it('issue 2483 - mantém visível o conteúdo carregado no controle ao inicializar o editor', () => {
        const textoComplementar = '<p>Particularidade sintética do participante</p>';
        const control = new FormControl(textoComplementar, { nonNullable: true });
        const changeDetector = jasmine.createSpyObj<ChangeDetectorRef>('ChangeDetectorRef', [
            'detectChanges',
            'markForCheck',
        ]);
        const elementRef = new ElementRef<Record<string, unknown>>({});
        const providers = new Map<unknown, unknown>([
            [ChangeDetectorRef, changeDetector],
            [ElementRef, elementRef],
            ['ID_GENERATOR_BASE', 'input-editor-issue-2483'],
            [FormBuilder, new FormBuilder()],
        ]);
        const injector = {
            get: <T>(token: unknown): T => {
                if (token === FormGroupDirective) {
                    throw new Error('FormGroupDirective indisponível neste teste unitário');
                }

                if (!providers.has(token)) {
                    const providerByName: Record<string, unknown> = {
                        DialogService: {},
                        GlobalsService: { baseURL: '' },
                        LookupService: {},
                        TemplateService: { renderTemplate: (template: string) => template },
                        UtilService: {},
                    };
                    const tokenName = (token as { name?: string }).name ?? '';

                    if (tokenName in providerByName) {
                        return providerByName[tokenName] as T;
                    }

                    throw new Error(`Provider não configurado: ${String(token)}`);
                }

                return providers.get(token) as T;
            },
        } as Injector;
        const component = new InputEditorComponent(injector);
        component.control = control;

        component.ngAfterViewInit();

        expect(component.value).toBe(textoComplementar);
        expect(control.value).toBe(textoComplementar);
    });
});
