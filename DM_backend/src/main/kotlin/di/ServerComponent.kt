package di

import controllers.generator.GeneratorController
import dagger.Component
import javax.inject.Singleton

@Singleton
@Component(modules = [GsonModule::class])
interface ServerComponent {

    fun inject(testController: GeneratorController)

}

