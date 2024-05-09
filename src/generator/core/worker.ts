import { ProcessEnum } from ".";
import { createProjectBuilder } from "./craete-project";


self.onmessage = async function (event) {
    if (event.data.type === ProcessEnum.RUN) {
        try {
            self.postMessage({ type: ProcessEnum.START, panoId: event.data.panoId });
            const builder = createProjectBuilder()
            const result = await builder.generateProject(event.data.data, event.data.panoId)
            self.postMessage({
                type: ProcessEnum.END,
                result: result,
                panoId: event.data.panoId
            });
        } catch (error) {
            self.postMessage({ type: ProcessEnum.ERROR, panoId: event.data.panoId })
        }
    }
}
