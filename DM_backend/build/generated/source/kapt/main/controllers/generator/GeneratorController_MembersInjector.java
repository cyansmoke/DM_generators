package controllers.generator;

import com.google.gson.Gson;
import dagger.MembersInjector;
import javax.annotation.Generated;
import javax.inject.Provider;

@Generated(
  value = "dagger.internal.codegen.ComponentProcessor",
  comments = "https://google.github.io/dagger"
)
public final class GeneratorController_MembersInjector
    implements MembersInjector<GeneratorController> {
  private final Provider<Gson> gsonProvider;

  public GeneratorController_MembersInjector(Provider<Gson> gsonProvider) {
    this.gsonProvider = gsonProvider;
  }

  public static MembersInjector<GeneratorController> create(Provider<Gson> gsonProvider) {
    return new GeneratorController_MembersInjector(gsonProvider);
  }

  @Override
  public void injectMembers(GeneratorController instance) {
    injectGson(instance, gsonProvider.get());
  }

  public static void injectGson(GeneratorController instance, Gson gson) {
    instance.gson = gson;
  }
}
