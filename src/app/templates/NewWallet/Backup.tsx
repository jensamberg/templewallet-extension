import React, { FC } from "react";

import { useForm } from "react-hook-form";

import Alert from "app/atoms/Alert";
import FormCheckbox from "app/atoms/FormCheckbox";
import FormField from "app/atoms/FormField";
import FormSubmitButton from "app/atoms/FormSubmitButton";
import { T, t } from "lib/i18n/react";

interface BackupFormData {
  backuped: boolean;
}

type BackupProps = {
  data: {
    mnemonic: string;
    password: string;
  };
  onBackupComplete: () => void;
};

const Backup: FC<BackupProps> = ({ data, onBackupComplete }) => {
  const { register, handleSubmit, errors, formState } =
    useForm<BackupFormData>();
  const submitting = formState.isSubmitting;

  return (
    <div className="w-full max-w-sm mx-auto my-8">
      <Alert
        title={""}
        description={
          <>
            <p>
              <T id="revealNewSeedPhrase" />
            </p>

            <p className="mt-1">
              <T id="doNotSharePhrase" />
            </p>
          </>
        }
        className="mt-4 mb-8"
      />

      <FormField
        secret
        textarea
        rows={4}
        readOnly
        label={t("mnemonicInputLabel")}
        labelDescription={t("youWillNeedThisSeedPhrase")}
        id="backup-mnemonic"
        spellCheck={false}
        containerClassName="mb-4"
        className="resize-none notranslate"
        value={data.mnemonic}
      />

      <form className="w-full mt-8" onSubmit={handleSubmit(onBackupComplete)}>
        <FormCheckbox
          ref={register({
            validate: (val) => val || t("unableToContinueWithoutConfirming"),
          })}
          errorCaption={errors.backuped?.message}
          name="backuped"
          label={t("backupedInputLabel")}
          labelDescription={<T id="backupedInputDescription" />}
          containerClassName="mb-6"
        />

        <T id="continue">
          {(message) => (
            <FormSubmitButton loading={submitting}>{message}</FormSubmitButton>
          )}
        </T>
      </form>
    </div>
  );
};

export default Backup;
