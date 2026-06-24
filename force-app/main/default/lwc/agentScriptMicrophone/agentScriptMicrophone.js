import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import AGENTFORCE_ICON from '@salesforce/resourceUrl/agentforceIcon';

const SIZE_MAP = {
    small: '1.313rem',
    medium: '1.688rem',
    large: '2.063rem'
};

export default class AgentScriptMicrophone extends LightningElement {
    @api script = '';
    @api recordId;
    @api color = 'rgb(0, 112, 210)';
    @api size = 'medium';

    agentforceIconUrl = AGENTFORCE_ICON;
    _isMuted = true;

    get microphoneIcon() {
        return this._isMuted ? 'utility:muted' : 'utility:unmuted';
    }

    get microphoneVariant() {
        return this._isMuted ? 'brand' : 'border-filled';
    }

    get microphoneTitle() {
        return this._isMuted ? 'Réactiver le micro' : 'Couper le micro';
    }

    get containerStyle() {
        const fontSize = SIZE_MAP[this.size] || SIZE_MAP.medium;
        return `border-color: ${this.color}; font-size: ${fontSize};`;
    }

    handleToggleMicrophone() {
        const toolkit = this.template.querySelector('lightning-service-cloud-voice-toolkit-api');
        if (!toolkit) return;
        if (this._isMuted) {
            toolkit.unmute();
        } else {
            toolkit.mute();
        }
        this._isMuted = !this._isMuted;
    }

    handleCopy() {
        if (!this.script) return;
        navigator.clipboard.writeText(this.script)
            .then(() => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Copié',
                    message: 'Le script a été copié dans le presse-papiers.',
                    variant: 'success',
                    mode: 'dismissable'
                }));
            })
            .catch(() => {
                const el = document.createElement('textarea');
                el.value = this.script;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Copié',
                    message: 'Le script a été copié dans le presse-papiers.',
                    variant: 'success',
                    mode: 'dismissable'
                }));
            });
    }
}
