import {
  Component
} from '../core/component'
import {
  apiService
} from '../services/api.service'
import {
  TransformService
} from '../services/transform.service'
import {
  renderPost
} from '../templates/post.template'
import {
  buttonHandler
} from '../services/buttonHandler.service'

export class PostsComponent extends Component {
  constructor(id, {
    loader
  }) {
    super(id)
    this.loader = loader
  }

  init() {
    this.$el.addEventListener('click', buttonHandler.bind(this))
  }

  async onShow() {
    this.loader.show()
    const fbData = await apiService.fetchPosts()
    const posts = TransformService.fbObjectToArray(fbData).reverse();
    const html = posts.map(post => renderPost(post, {
      withButton: true
    }))
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}