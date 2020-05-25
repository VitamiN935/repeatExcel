import {defaultTitle} from '@/constants';

export function createHeader(state) {
  const title = state.title || defaultTitle
  return `<input type="text" class="input" value="${title}">

            <div class="navigation">

                <div class="button">
                    <span class="material-icons">delete</span>
                </div>

                <div class="button">
                    <span class="material-icons">exit_to_app</span>
                </div>

            </div>`
}
