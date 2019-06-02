package di;

import com.google.gson.Gson;
import controllers.generator.GeneratorController;
import controllers.generator.GeneratorController_MembersInjector;
import dagger.internal.DoubleCheck;
import dagger.internal.Preconditions;
import javax.annotation.Generated;
import javax.inject.Provider;

@Generated(
  value = "dagger.internal.codegen.ComponentProcessor",
  comments = "https://google.github.io/dagger"
)
public final class DaggerServerComponent implements ServerComponent {
  private Provider<Gson> provideGsonProvider;

  private DaggerServerComponent(GsonModule gsonModuleParam) {

    initialize(gsonModuleParam);
  }

  public static Builder builder() {
    return new Builder();
  }

  public static ServerComponent create() {
    return new Builder().build();
  }

  @SuppressWarnings("unchecked")
  private void initialize(final GsonModule gsonModuleParam) {
    this.provideGsonProvider =
        DoubleCheck.provider(GsonModule_ProvideGsonFactory.create(gsonModuleParam));
  }

  @Override
  public void inject(GeneratorController testController) {
    injectGeneratorController(testController);
  }

  private GeneratorController injectGeneratorController(GeneratorController instance) {
    GeneratorController_MembersInjector.injectGson(instance, provideGsonProvider.get());
    return instance;
  }

  public static final class Builder {
    private GsonModule gsonModule;

    private Builder() {}

    public Builder gsonModule(GsonModule gsonModule) {
      this.gsonModule = Preconditions.checkNotNull(gsonModule);
      return this;
    }

    public ServerComponent build() {
      if (gsonModule == null) {
        this.gsonModule = new GsonModule();
      }
      return new DaggerServerComponent(gsonModule);
    }
  }
}
