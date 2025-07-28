import css from "./UploadForm.module.css";

const UploadForm = () => {
    /*
    const state = getState();
    const userId = state.auth.user._id;
    const token = state.auth.token;
    */

    return (
        <div className={css.containerUploadForm}>
            <h2 className={css.titleUploadForm}>Upload your photo</h2>

            <label class={css.labelUploadForm}>
                <input type="file" accept="image/*" class={css.inputUploadForm} />
                <div class={css.circleButtonUploadForm}>
                    <svg class={css.iconCircleButtonUploadForm}>
                        <use xlinkHref='/icons/sprite.svg#eye'></use>
                    </svg>

                </div>
            </label>

            <button className={css.buttonUploadForm}>Save</button>
        </div>
    );
};

export default UploadForm;
